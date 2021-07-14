using System.Threading.Tasks;
using EpicerieOnline2.Core;

namespace EpicerieOnline2.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly EpicerieOnlineDbContext context;

        public UnitOfWork(EpicerieOnlineDbContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}