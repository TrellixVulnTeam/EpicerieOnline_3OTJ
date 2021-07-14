using EpicerieOnline2.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EpicerieOnline2.Controllers.Resources
{

    public class ProductResource
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string Unit { get; set; }
        public int CategoryId { get; set; }
        public string ImageUrl { get; set; }
        public int Quantity { get; set; }



    }
}
