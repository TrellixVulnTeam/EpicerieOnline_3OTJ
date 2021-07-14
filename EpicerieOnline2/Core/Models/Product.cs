using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EpicerieOnline2.Core.Models
{
    [Table("Products")]
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        [Required]
        [StringLength(255)]
        public string Description { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        [StringLength(15)]
        public string Unit { get; set; }

        [Required]
        [StringLength(255)]
        public string ImageUrl { get; set; }
        
        public int CategoryId { get; set; }

        public Category Category { get; set; }
    }
}
