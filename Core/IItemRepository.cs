using System.Collections.Generic;
using System.Threading.Tasks;

namespace EpicerieOnline2.Core.Models
{
    public interface IItemRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetItems();

        Task<T> GetItem(int id);

        void Add(T item);

        void Remove(T item);
    }
}
