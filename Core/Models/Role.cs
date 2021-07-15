using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace EpicerieOnline2.Core.Models
{

    [Table("Roles")]
    public class Role
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Customer> Customers { get; set; }

        public Role()
        {
            Customers = new Collection<Customer>();
        }
    }


}