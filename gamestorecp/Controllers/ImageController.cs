using gamestorecp.Models;
using gamestorecp.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gamestorecp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private DatabaseContext _context;

        public ImageController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("getAll/{productId}")]
        public async Task<ActionResult<IEnumerable<Image>>> Get(int productId)
        {
            var images = await _context.Images
                .Where(x => x.ProductId == productId)
                .ToListAsync();

            return Ok(images);
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> Post(Image model)
        {
            if (ModelState.IsValid)
            {
                await _context.Images
                    .AddAsync(new Image()
                    {
                        Url = model.Url,
                        ProductId = model.ProductId
                    });

                await _context.SaveChangesAsync();

                return Ok(new { message = "Изображение успешно добавлено!" });
            }

            return BadRequest(new { message = "Ошибка сервера!" });
        }

        [HttpDelete]
        [Route("delete/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> Delete(int id)
        {
            var image = await _context.Images
                .FirstOrDefaultAsync(x => x.Id == id);

            if (image == null)
                return NotFound();

            _context.Images.Remove(image);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Изображение успешно удалено!" });
        }
    }
}
