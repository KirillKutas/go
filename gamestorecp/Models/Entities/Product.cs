using System.Collections.Generic;

namespace gamestorecp.Models.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int YearOfIssue { get; set; }
        public string Developer { get; set; }
        public int Cost { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string Categories { get; set; }

        public Requirement Requirement { get; set; }
        
        public virtual List<Image> Images { get; set; }
        public virtual List<OrderProduct> OrderProducts { get; set; }

        public Product()
        {
            Images = new List<Image>();
            OrderProducts = new List<OrderProduct>();
        }
    }
}
