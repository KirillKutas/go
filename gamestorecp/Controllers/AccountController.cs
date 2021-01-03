using gamestorecp.Models;
using gamestorecp.Models.Entities;
using gamestorecp.Models.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace gamestorecp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private DatabaseContext _context;

        public AccountController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _context.Users
                    .Include(x => x.Role)
                    .FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == GetHashString(model.Password));

                if (user != null)
                {
                    await Authenticate(user);

                    return Ok(new { message = "Вы успено авторизированы!" });
                }
            }

            return BadRequest(new { message = "Некорректные логин и(или) пароль!" });
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (user == null)
                {
                    user = new User { Email = model.Email, Password = GetHashString(model.Password), FirstName = model.FirstName, LastName = model.LastName };
                    var userRole = await _context.Roles.FirstOrDefaultAsync(x => x.Name == "user");
                    if (userRole != null)
                        user.Role = userRole;

                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();

                    await Authenticate(user);

                    return Ok(new { message = "Вы успешно зарегистрированы!" });
                }
                else
                    return BadRequest(new { message = "Пользователь с таким e-mail уже существует!" });
            }

            return BadRequest(new { message = "Заполните корректно всю форму!" });
        }

        [HttpGet]
        [Route("logout")]
        public async Task<ActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }

        [HttpGet]
        [Route("isAuthorize")]
        public async Task<ActionResult> IsAuthorize()
        {
            var resultAuth = false;

            if (User.Identity.IsAuthenticated)
                resultAuth = true;

            return Ok(new { isAuth = resultAuth });
        }

        [HttpGet]
        [Route("getRole")]
        public async Task<ActionResult> GetRole()
        {
            var resultRole = string.Empty;

            if (User.Identity.IsAuthenticated)
            {
                var user = await _context.Users
                    .Include(x => x.Role)
                    .FirstOrDefaultAsync(x => x.Email == User.Identity.Name);

                resultRole = user.Role.Name;
            }

            return Ok(new { role = resultRole });
        }

        [HttpGet]
        [Route("getProfile")]
        public async Task<ActionResult<UserModel>> GetProfile()
        {
            var user = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Email == User.Identity.Name);

            if (user == null)
                return NotFound();

            return Ok(new UserModel()
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role.Name
            });
        }

        private async Task Authenticate(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user?.Role?.Name)
            };
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        private static string GetHashString(string s)
        {
            //переводим строку в байт-массим  
            byte[] bytes = Encoding.Unicode.GetBytes(s);

            //создаем объект для получения средст шифрования  
            MD5CryptoServiceProvider CSP =
                new MD5CryptoServiceProvider();

            //вычисляем хеш-представление в байтах  
            byte[] byteHash = CSP.ComputeHash(bytes);

            string hash = string.Empty;

            //формируем одну цельную строку из массива  
            foreach (byte b in byteHash)
                hash += string.Format("{0:x2}", b);

            return hash;
        }
    }
}
