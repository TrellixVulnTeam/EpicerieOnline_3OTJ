using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using EpicerieOnline2.Controllers.Resources;
using EpicerieOnline2.Core;
using EpicerieOnline2.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EpicerieOnline2.Controllers
{
    [Route("/api/categories")]
    public class CategoriesController : Controller
    {


        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        private readonly IItemRepository<Category> repository;

        public CategoriesController(IMapper mapper, IUnitOfWork unitOfWork, IItemRepository<Category> repository)
        {
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
            this.repository = repository;
        }


        [HttpGet]
        public async Task<IEnumerable<CategoryResource>> GetCategories()
        {
            
            var categories = await repository.GetItems();

            return mapper.Map<IEnumerable<Category>, IEnumerable<CategoryResource>>(categories);

        }
    }
}
