using gamestorecp.Models.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace gamestorecp.Models.ViewModels
{
    public class ProductModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Не указано имя")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Не указан год выпуска")]
        [Range(1970, 2020, ErrorMessage = "Некорректный год выпуска")]
        public int YearOfIssue { get; set; }

        [Required(ErrorMessage = "Не указан разработчик")]
        public string Developer { get; set; }

        [Required(ErrorMessage = "Не указана цена")]
        [Range(0, 10000, ErrorMessage = "Некорректная цена")]
        public int Cost { get; set; }

        [Required(ErrorMessage = "Нет указано изображение")]
        public string Image { get; set; }

        [Required(ErrorMessage = "Не указано описание")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Не указаны категории")]
        public string Categories { get; set; }
        public bool IsCorrect { get; set; }

        //-------------------
        public int? RequirementId { get; set; }
        public string OS { get; set; }
        public string Processor { get; set; }
        public string RAM { get; set; }
        public string VideoCard { get; set; }
        public int? FreeHardDiskSpace { get; set; }

        //-----------------------

        public bool isOrder { get; set; }
    }
}
