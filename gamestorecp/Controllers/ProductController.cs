using gamestorecp.Models;
using gamestorecp.Models.Entities;
using gamestorecp.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gamestorecp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private DatabaseContext _context;

        public ProductController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("getAll")]
        public async Task<ActionResult<IEnumerable<ProductModel>>> Get()
        {
            var products = await _context.Products
                .Include(x => x.Requirement)
                .Include(x => x.Images)
                .ToListAsync();

            return Ok(products.Select(x => new ProductModel
            {
                Name = x.Name,
                Categories = x.Categories,
                Cost = x.Cost,
                Developer = x.Developer,
                Description = x.Description,
                Id = x.Id,
                Image = x.Image,
                YearOfIssue = x.YearOfIssue,
                IsCorrect = x.Requirement == null ? false : true
            }));
        }

        [HttpGet]
        [Route("getByCategories/{categories}")]
        public async Task<ActionResult<IEnumerable<ProductModel>>> Get(string categories)
        {
            var products = await _context.Products
                .Where(x => x.Categories.Contains(categories))
                .ToListAsync();

            return Ok(products.Select(x => new ProductModel
            {
                Name = x.Name,
                Id = x.Id
            }));
        }

        [HttpGet]
        [Route("getById/{id}")]
        public async Task<ActionResult<ProductModel>> Get(int id)
        {
            var product = await _context.Products
                .Include(x => x.Requirement)
                .Include(x => x.Images)
                .FirstOrDefaultAsync(x => x.Id == id);

            //OrderProduct order = null;

            //if (User.Identity.IsAuthenticated)
            //{
            //    var userId = _context.Users.FirstOrDefaultAsync(x => x.Email == User.Identity.Name).GetAwaiter().GetResult().Id;

            //    order = await _context.UserProducts
            //        .FirstOrDefaultAsync(x => x.ProductId == id && x.UserId == userId);
            //}

            if (product == null)
                return NotFound();

            return Ok(new ProductModel()
            {
                Id = product.Id,
                Categories = product.Categories,
                Cost = product.Cost,
                Description = product.Description,
                Developer = product.Developer,
                Image = product.Image,
                Name = product.Name,
                YearOfIssue = product.YearOfIssue,
                Processor = product.Requirement?.Processor,
                FreeHardDiskSpace = product.Requirement?.FreeHardDiskSpace,
                OS = product.Requirement?.OS,
                RAM = product.Requirement?.RAM,
                VideoCard = product.Requirement?.VideoCard,
                RequirementId = product.Requirement?.Id
                //isOrder = (order == null) ? false : true
            });
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> Post(ProductModel model)
        {
            if (ModelState.IsValid)
            {
                await _context.Products
                    .AddAsync(new Product()
                    {
                        Name = model.Name,
                        YearOfIssue = model.YearOfIssue,
                        Cost = model.Cost,
                        Description = model.Description,
                        Image = model.Image,
                        Developer = model.Developer,
                        Categories = model.Categories
                    });

                await _context.SaveChangesAsync();

                return Ok(new { message = "Продукт успешно создан!" });
            }

            return BadRequest(new { message = "Продукт составлен неверно!" });
        }

        [HttpPut]
        [Route("update")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Product>> Put(ProductModel model)
        {
            if (model.Id == 0)
                return NotFound();

            var errors = new List<string>();

            var product = await _context.Products
                .FirstOrDefaultAsync(x => x.Id == model.Id);

            if (!string.IsNullOrWhiteSpace(model.Name))
                product.Name = model.Name;

            if (model.YearOfIssue != 0 && model.YearOfIssue >= 1970)
                product.YearOfIssue = model.YearOfIssue;
            else
                errors.Add("Некорректный год выпуска!");

            if (model.Cost != 0 && model.Cost > 0)
                product.Cost = model.Cost;
            else
                errors.Add("Некорректная цена!");

            if (!string.IsNullOrWhiteSpace(model.Description))
                product.Description = model.Description;

            if (!string.IsNullOrWhiteSpace(model.Image))
                product.Image = model.Image;

            if (!string.IsNullOrWhiteSpace(model.Developer))
                product.Developer = model.Developer;

            if (!string.IsNullOrWhiteSpace(model.Categories))
                product.Categories = model.Categories;

            if (errors.Any())
                return BadRequest(new { message = "Продукт составлен некорректно!" });

            _context.Update(product);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Продукт успешно изменен!" });
        }

        [HttpDelete]
        [Route("delete/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> Delete(int id)
        {
            var product = await _context.Products
                .FirstOrDefaultAsync(x => x.Id == id);

            if (product == null)
                return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
