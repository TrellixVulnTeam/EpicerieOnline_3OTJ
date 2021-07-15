using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace EpicerieOnline2.Core.Models
{
    [Table("Categories")]
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public ICollection<Product> Products { get; set; }

        [Required]
        [StringLength(255)]
        public string ImageCatUrl { get; set; }

        public Category()
        {
            Products = new Collection<Product>();
        }
    }
}
