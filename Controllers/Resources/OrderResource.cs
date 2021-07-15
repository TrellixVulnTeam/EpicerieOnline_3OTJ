using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace EpicerieOnline2.Controllers.Resources
{
    public class OrderResource
    {

        public int Id { get; set; }

        public SaveCustomerResourse Customer { get; set; }

        public DateTime Date { get; set; }

        public string Address { get; set; }

        public string Name { get; set; }

        public double PriceTotal { get; set; }

        public bool IsValidate { get; set; }

        public bool IsCompleted { get; set; }


        public ICollection<ProductResource> Products { get; set; }

        public OrderResource()
        {
            Products = new Collection<ProductResource>();
        }
    }
}
