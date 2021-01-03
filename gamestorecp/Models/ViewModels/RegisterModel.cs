using System.ComponentModel.DataAnnotations;

namespace gamestorecp.Models.ViewModels
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Не указан e-mail")]
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$", ErrorMessage = "Некорректный e-mail")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Не указан пароль")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Не указано имя")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Не указана фамилия")]
        public string LastName { get; set; }
    }
}
