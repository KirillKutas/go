using System;

namespace gamestorecp.Models.ViewModels
{
    public class OrderModel
    {
        public int Id { get; set; }
        public string OrderCreated { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public bool IsBought { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Oplata { get; set; }
        public string Dostavka { get; set; }
        public int Cost { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int TotalCost { get; set; }
        public int? OrderId { get; set; }
    }
}
