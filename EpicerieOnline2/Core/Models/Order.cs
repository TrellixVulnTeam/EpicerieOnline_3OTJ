using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EpicerieOnline2.Core.Models
{
    [Table("Orders")]
    public class Order
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }

        public Customer Customer { get; set; }

        public DateTime Date { get; set; }

        public string Name { get; set; }

        [Required]
        [StringLength(255)]
        public string Address { get; set; }

        public double PriceTotal { get; set; }

        public bool IsValidate { get; set; }

        public bool IsCompleted { get; set; }

        public ICollection<OrderProduct> Products { get; set; }

        public Order()
        {
            Products = new Collection<OrderProduct>();
        }



    }
}
