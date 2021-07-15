﻿using System.ComponentModel.DataAnnotations.Schema;


namespace EpicerieOnline2.Core.Models
{
    [Table("OrderProducts")]
    public class OrderProduct
    {
        public int OrderId { get; set; }

        public int ProductId { get; set; }

        public Order Order { get; set; }

        public Product Product { get; set; }

        public int Quantity { get; set; }


    }
}
