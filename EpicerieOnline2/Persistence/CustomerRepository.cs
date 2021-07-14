using EpicerieOnline2.Controllers.Resources;
using EpicerieOnline2.Core;
using EpicerieOnline2.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EpicerieOnline2.Persistence
{
    public class CustomerRepository : ICustomerRepository
    {

        private readonly EpicerieOnlineDbContext context;

        public CustomerRepository(EpicerieOnlineDbContext context)
        {
            this.context = context;
        }


        public void Add(Customer customer)
        {
            context.Customers.Add(customer);
        }

        public void Remove(Customer customer)
        {
            context.Remove(customer);
        }

        public async Task<Customer> GetItem(int id)
        {
            return await context.Customers
                .Include(c => c.Orders).SingleOrDefaultAsync(c => c.Id == id);
        }

        public Customer GetItem(string email)
        {
            return context.Customers
                .Include(c=>c.Role)
                .SingleOrDefault(c => c.Email == email);
        }

        public async Task<IEnumerable<Customer>> GetItems()
        {
            return await context.Customers
                .Include(c => c.Orders).ToListAsync();
        }

    }
}
