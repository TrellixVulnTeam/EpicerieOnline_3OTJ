using System.Collections.Generic;
using System.Threading.Tasks;
using EpicerieOnline2.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace EpicerieOnline2.Persistence
{
    public class ProductRepository : IItemRepository<Product>
    {

        private readonly EpicerieOnlineDbContext context;

        public ProductRepository(EpicerieOnlineDbContext context)
        {
            this.context = context;
        }

        public void Add(Product item)
        {
            context.Products.Add(item);
        }
        public void Remove(Product item)
        {
            context.Remove(item);
        }

        public async Task<Product> GetItem(int id)
        {
            return await context.Products
                .Include(p => p.Category).SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Product>> GetItems()
        {
            return await context.Products
                 .Include(p => p.Category).ToListAsync();
        }

       
    }
}
