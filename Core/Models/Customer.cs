using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace EpicerieOnline2.Core.Models
{
    [Table("Customers")]
    public class Customer
    {
        public int Id { get; set; }
       
        [Required]
        [StringLength(255)]
        public string Email { get; set; }

        
        public string PasswordHash { get; set; }

        public ICollection<Order> Orders { get; set; }

        [Required]
        public int RoleId { get; set; }

        public  Role Role { get; set; }

        public Customer()
        {
            Orders = new Collection<Order>();
        }
    }

    
}

