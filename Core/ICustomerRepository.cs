using System.Collections.Generic;
using System.Threading.Tasks;
using EpicerieOnline2.Core.Models;

namespace EpicerieOnline2.Core
{
    public interface ICustomerRepository
    {
        void Add(Customer customer);
        Task<Customer> GetItem(int id);
        Customer GetItem(string email);
        Task<IEnumerable<Customer>> GetItems();
        void Remove(Customer customer);
    }
}