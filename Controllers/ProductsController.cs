 using AutoMapper;
using EpicerieOnline2.Controllers.Resources;
using EpicerieOnline2.Core;
using EpicerieOnline2.Core.Models;
using EpicerieOnline2.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EpicerieOnline2.Controllers
{
    [Route("/api/products")]
    [ApiController]
    public class ProductsController : Controller
    {
        private readonly IMapper mapper;
        private readonly IItemRepository<Product> repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly ILogger<ProductsController> logger;

        public ProductsController(IMapper mapper, IItemRepository<Product> repository, IUnitOfWork unitOfWork, ILogger<ProductsController> logger)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
            this.logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await repository.GetItem(id);


            if (product is null)
                throw new  NotFoundException("Product not found");

            var productResource = mapper.Map<Product, ProductResource>(product);

            return Ok(productResource);
        }


        [HttpGet]
        public async Task<IEnumerable<ProductResource>> GetProduct()
        {

            var products = await repository.GetItems();

            return mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);

        }


        [HttpPost()]
        public async Task<IActionResult> CreateProduct([FromBody] ProductResource productResource)
        {

            var product = mapper.Map<ProductResource, Product>(productResource);

            repository.Add(product);
            await unitOfWork.CompleteAsync();

            product = await repository.GetItem(product.Id);

            var result = mapper.Map<Product, ProductResource>(product);

            return Ok(result);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductResource productResource)
        {

            var product = await repository.GetItem(id);

            if (product is null)
                throw new NotFoundException("Product not found");

            mapper.Map<ProductResource, Product>(productResource, product);


            await unitOfWork.CompleteAsync();

            product = await repository.GetItem(product.Id);
            var result = mapper.Map<Product, ProductResource>(product);

            return Ok(result);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await repository.GetItem(id);

            if (product is null)
                throw new NotFoundException("Product not found");

            repository.Remove(product);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }



    }
}
