using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EpicerieOnline2.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace EpicerieOnline2.Persistence
{
    public class OrderRepository : IOrderRepository
    {
        private readonly EpicerieOnlineDbContext context;

        public OrderRepository(EpicerieOnlineDbContext context)
        {
            this.context = context;
        }

        public void Add(Order order)
        {
            context.Orders.Add(order);
        }

        public async Task<Order> GetOrder(int id)
        {
            return await context.Orders
                 .Include(o => o.Customer)
                 .Include(o => o.Products)
                 .ThenInclude(p => p.Product).SingleOrDefaultAsync(o => o.Id == id);
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            return await context.Orders
                .Include(o => o.Customer)
                .Include(o => o.Products)
                .ThenInclude(p => p.Product).ToListAsync();
        }

        public Task<IEnumerable<Order>> GetOrders(int customerId)
        {
            throw new NotImplementedException();
        }

        public void Remove(Order order)
        {
            context.Remove(order);
        }
    }
}
