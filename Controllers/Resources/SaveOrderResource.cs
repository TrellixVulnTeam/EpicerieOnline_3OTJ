using EpicerieOnline2.Core.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;


namespace EpicerieOnline2.Controllers.Resources
{

    public class SaveOrderResource
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double PriceTotal { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsValidate { get; set; }


        public ICollection<SaveProductResource> Products { get; set; }
        public SaveOrderResource()
        {
            Products = new Collection<SaveProductResource>();
        }
    }
}
