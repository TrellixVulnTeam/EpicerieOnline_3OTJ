using System.Collections.Generic;
using System.Threading.Tasks;

namespace EpicerieOnline2.Core.Models
{
    public interface IOrderRepository
    {
        Task<Order> GetOrder(int id);

        void Add(Order order);

        void Remove(Order order);

        Task<IEnumerable<Order>> GetOrders();

        Task<IEnumerable<Order>> GetOrders(int customerId);
    }
}
