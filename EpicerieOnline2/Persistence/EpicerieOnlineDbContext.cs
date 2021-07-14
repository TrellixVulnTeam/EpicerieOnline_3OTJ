using EpicerieOnline2.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace EpicerieOnline2.Persistence
{
    public class EpicerieOnlineDbContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Category> Categories { get; set; }


        public EpicerieOnlineDbContext(DbContextOptions<EpicerieOnlineDbContext> options)
          : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderProduct>().HasKey(op =>
              new { op.OrderId, op.ProductId });


        }
    }
}