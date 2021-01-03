using gamestorecp.Models;
using gamestorecp.Models.Entities;
using gamestorecp.Models.ViewModels;
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
    public class OrderController : ControllerBase
    {
        private DatabaseContext _context;

        public OrderController(DatabaseContext context)
        {
            _context = context;
        }

        //[HttpGet]
        //[Route("getAll")]
        //[Authorize(Roles = "admin")]
        //public async Task<ActionResult<IEnumerable<OrderModel>>> GetAll()
        //{
        //    var orders = await _context.Orders
        //        .Include(x => x.Product)
        //        .ToListAsync();

        //    return Ok(orders.Select(x => new OrderModel()
        //    {
        //        Id = x.Id,
        //        ProductName = x.Product.Name,
        //        OrderCreated = x.OrderCreated,
        //        ProductId = x.ProductId,
        //        ProductImage = x.Product.Image,
        //        IsBought = x.IsBought,
        //        UserId = x.UserId
        //    }));
        //}

        [HttpGet]
        [Route("getAllBoughtProducts")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<IEnumerable<OrderModel>>> GetAllBought()
        {
            var orders = await _context.OrderProducts
                .Include(x => x.Order)
                .Include(x => x.Product)
                .Where(x => x.IsBought)
                .ToListAsync();

            //var tempOrders = orders.Select(x => x.OrderProducts).ToList();
            //var orderProducts = new List<OrderProduct>();

            //for (int i = 0; i < tempOrders.Count; i++)
            //{
            //    orderProducts.AddRange(tempOrders[i]);
            //}


            return Ok(orders.Select(x => new OrderModel()
            {
                Id = x.Id,
                OrderId = x.OrderId,
                OrderCreated = x.Order.OrderCreated.ToString("dddd, dd MMMM yyyy HH:mm:ss"),
                ProductName = x.Product.Name,
                ProductId = x.ProductId,
                Address = x.Order.Address,
                Dostavka = x.Order.Dostavka,
                Oplata = x.Order.Oplata,
                Phone = x.Order.Phone,
                Cost = x.Product.Cost,
                UserId = x.Order.UserId,
                UserName = _context.Users.FirstOrDefault(u => u.Id == x.Order.UserId).FirstName + " " + _context.Users.FirstOrDefault(u => u.Id == x.Order.UserId).LastName
            })); 
        }

        [HttpGet]
        [Route("getByUserIdBought")]
        [Authorize(Roles = "user")]
        public async Task<ActionResult<IEnumerable<OrderModel>>> GetBought()
        {
            var listProducts = new List<Product>();

            var userName = User.Identity.Name;
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == userName);

            var orders = _context.Orders
                .Include(x => x.OrderProducts)
                .Where(x => x.UserId == user.Id && x.IsBought)
                .ToList();

            if (orders != null)
            {

                var tempOrder = orders.Select(x => x.OrderProducts).ToList();
                var orderProducts = new List<OrderProduct>();

                for (int i = 0; i < tempOrder.Count; i++)
                {
                    orderProducts.AddRange(tempOrder[i]);
                }

                for (int i = 0; i < orderProducts.Count(); i++)
                {
                    listProducts.Add(await _context.Products.FirstOrDefaultAsync(x => x.Id == orderProducts[i].ProductId));
                }

                return Ok(listProducts.Select(x => new OrderModel()
                {
                    Id = x.Id,
                    ProductName = x.Name,
                    ProductId = x.Id,
                    ProductImage = x.Image,
                    Cost = x.Cost
                }));
            }

            return Ok(listProducts);
        }

        [HttpGet]
        [Route("getByUserIdNotBought")]
        [Authorize(Roles = "user")]
        public async Task<ActionResult<IEnumerable<OrderModel>>> GetNotBought()
        {
            var listProducts = new List<Product>();

            var userName = User.Identity.Name;
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == userName);

            var order = await _context.Orders
                .Include(x => x.OrderProducts)
                .FirstOrDefaultAsync(x => x.UserId == user.Id && !x.IsBought);

            if (order != null)
            {
                var list = order?.OrderProducts.ToList();

                for (int i = 0; i < list.Count(); i++)
                {
                    listProducts.Add(await _context.Products.FirstOrDefaultAsync(x => x.Id == list[i].ProductId));
                }

                return Ok(listProducts.Select(x => new OrderModel()
                {
                    Id = x.Id,
                    ProductName = x.Name,
                    ProductId = x.Id,
                    ProductImage = x.Image,
                    Cost = x.Cost,
                    TotalCost = listProducts.Sum(x => x.Cost)
                }));
            }

            return Ok(listProducts);
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "user")]
        public async Task<ActionResult> Post(OrderModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == User.Identity.Name);
                var order = await _context.Orders
                    .Include(item => item.OrderProducts)
                    .FirstOrDefaultAsync(x => x.UserId == user.Id && !x.IsBought);

                if (order != null)
                {
                    var countProduct = order.OrderProducts.Where(item => item.ProductId == model.ProductId);
                    if (countProduct.Count() > 5)
                    {
                        return BadRequest(new { message = "Максимальное количество копий одной игры в одном заказе - 6" });
                    }
                }
                

                if (order == null)
                {
                    await _context.Orders
                        .AddAsync(new Order()
                        {
                            UserId = user.Id,
                            OrderCreated = DateTime.Now,
                            IsBought = false
                        });

                    await _context.SaveChangesAsync();
                    order = await _context.Orders.FirstOrDefaultAsync(x => x.UserId == user.Id && !x.IsBought);
                }

                await _context.OrderProducts
                  .AddAsync(new OrderProduct()
                  {
                      OrderId = order.Id,
                      ProductId = model.ProductId,
                      IsBought = false
                  });

                await _context.SaveChangesAsync();

                return Ok(new { message = "Товар добавлен в избранные!" });
            }

            return BadRequest(new { message = "Ошибка сервера!" });
        }

        [HttpPut]
        [Route("buy")]
        [Authorize(Roles = "user")]
        public async Task<ActionResult> Put(TempOrder model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == User.Identity.Name);

            var order = await _context.Orders
                .FirstOrDefaultAsync(x => x.UserId == user.Id && !x.IsBought);

            var products = await _context.OrderProducts
                .Where(x => x.OrderId == order.Id && !x.IsBought)
                .ToListAsync();

            for (int i = 0; i < products.Count; i++)
            {
                products[i].IsBought = true;
                _context.OrderProducts.Update(products[i]);
            }

            order = await _context.Orders
                .FirstOrDefaultAsync(x => x.UserId == user.Id && !x.IsBought);
            order.IsBought = true;
            order.OrderCreated = DateTime.Now;
            order.Oplata = model.Oplata;
            order.Dostavka = model.Dostavka;
            order.Address = model.Address;
            order.Phone = model.Phone;
            _context.Orders.Update(order);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Товар успешно куплен!"
            });
        }

        public class TempOrder
        {
            public OrderModel[] Orders { get; set; }
            public string Oplata { get; set; }
            public string Dostavka { get; set; }
            public string Phone { get; set; }
            public string Address { get; set; }
            public int Cost { get; set; }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        [Authorize(Roles = "user")]
        public async Task<ActionResult> Delete(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == User.Identity.Name);

            var order = await _context.Orders.FirstOrDefaultAsync(x => x.UserId == user.Id && !x.IsBought);

            var product = await _context.OrderProducts
                .FirstOrDefaultAsync(x => x.OrderId == order.Id && x.ProductId == id && !x.IsBought);

            if (product == null)
                return NotFound();

            _context.OrderProducts.Remove(product);
            await _context.SaveChangesAsync();

            var any = await _context.OrderProducts
                .FirstOrDefaultAsync(x => x.OrderId == order.Id);

            if (any == null)
            {
                order = await _context.Orders.FirstOrDefaultAsync(x => x.UserId == user.Id && !x.IsBought);
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }

            return Ok(new { message = "Товар убран из избранных!" });
        }
    }
}
