using System.ComponentModel.DataAnnotations;

namespace gamestorecp.Models.ViewModels
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Не указан e-mail")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Не указан пароль")]
        public string Password { get; set; }
    }
}
