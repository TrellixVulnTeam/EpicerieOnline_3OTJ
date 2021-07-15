using EpicerieOnline2.Core.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EpicerieOnline2.Controllers.Resources
{
    public class SaveCustomerResourse
    {

        public int Id { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public int RoleId { get; set; } = 1;


    }
}
