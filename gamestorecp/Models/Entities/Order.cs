using System;
using System.Collections.Generic;

namespace gamestorecp.Models.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderCreated { get; set; }
        public bool IsBought { get; set; }
        public string Dostavka { get; set; }
        public string Oplata { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public virtual List<OrderProduct> OrderProducts { get; set; }

        public Order()
        {
            OrderProducts = new List<OrderProduct>();
        }
    }
}
