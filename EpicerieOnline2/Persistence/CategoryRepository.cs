using System.Collections.Generic;
using System.Threading.Tasks;
using EpicerieOnline2.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace EpicerieOnline2.Persistence
{
    public class CategoryRepository : IItemRepository<Category>
    {

        private readonly EpicerieOnlineDbContext context;

        public CategoryRepository(EpicerieOnlineDbContext context)
        {
            this.context = context;
        }


        public void Add(Category item)
        {
             context.Categories.Add(item);
        }

        public void Remove(Category item)
        {
            context.Remove(item);
        }

        public async Task<Category> GetItem(int id)
        {
            return await context.Categories.SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Category>> GetItems()
        {
            return await context.Categories.ToListAsync();
        }

      
    }
}
