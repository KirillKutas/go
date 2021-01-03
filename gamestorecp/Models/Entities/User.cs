using System.Collections.Generic;

namespace gamestorecp.Models.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }

        public List<Order> Orders { get; set; }
        public User()
        {
            Orders = new List<Order>();
        }
    }
}
