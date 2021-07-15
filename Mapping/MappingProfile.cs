using AutoMapper;
using EpicerieOnline2.Controllers.Resources;
using EpicerieOnline2.Core.Models;
using System.Linq;

namespace EpicerieOnline2.Mapping
{
    public class MappingProfile : Profile
    {


        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Category, CategoryResource>();
            CreateMap<Customer, SaveCustomerResourse>();
            CreateMap<Product, ProductResource>();
            CreateMap<Order, OrderResource>()
              .ForMember(or => or.Products, opt => opt.MapFrom(o => o.Products.Select(op => new ProductResource { Id = op.Product.Id, Title = op.Product.Title, CategoryId = op.Product.CategoryId, Price = op.Product.Price, Quantity = op.Quantity })));





            // API Resource to Domain
            CreateMap<SaveCustomerResourse, Customer>()
                .ForMember(c => c.Id, opt => opt.Ignore());
            CreateMap<ProductResource, Product>()
                 .ForMember(p => p.Id, opt => opt.Ignore());
            CreateMap<SaveOrderResource, Order>()
                 .ForMember(o => o.Id, opt => opt.Ignore())
                .ForMember(o => o.Products, opt => opt.MapFrom(so => so.Products.Select(p => new OrderProduct { ProductId = p.Id, Quantity = p.Quantity })));




        }
    }
}
