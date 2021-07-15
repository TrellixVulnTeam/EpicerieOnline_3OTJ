using AutoMapper;
using EpicerieOnline2.Core;
using EpicerieOnline2.Core.Models;
using Microsoft.AspNetCore.Mvc;
using EpicerieOnline2.Controllers.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using EpicerieOnline2.Exceptions;
using EpicerieOnline2.EmailSender;

namespace EpicerieOnline2.Controllers
{

    [Route("/api/orders")]
    [ApiController]
    public class OrdersController : Controller
    {
        private readonly IMapper mapper;
        private readonly IOrderRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private  ISender email;

        public OrdersController(
            IMapper mapper,
            IOrderRepository repository,
            IUnitOfWork unitOfWork,
            ISender email
            )
        {
            this.mapper = mapper;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
            this.email = email;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await repository.GetOrder(id);

            if (order is null)
                throw new NotFoundException("Order not found");

            var orderResource = mapper.Map<Order, OrderResource>(order);

            return Ok(orderResource);
        }

        [HttpGet]
        public async Task<IEnumerable<OrderResource>> GetOrders()
        {

            var order = await repository.GetOrders();

            return mapper.Map<IEnumerable<Order>, IEnumerable<OrderResource>>(order);

        }

        [HttpPost()]
        public async Task<IActionResult> CreateOrder([FromBody] SaveOrderResource orderResource)
        {

            var order = mapper.Map<SaveOrderResource, Order>(orderResource);
            order.Date = DateTime.Now;

            repository.Add(order);
            await unitOfWork.CompleteAsync();

            order = await repository.GetOrder(order.Id);

            var result = mapper.Map<Order, OrderResource>(order);

            return Ok(result);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, [FromBody] SaveOrderResource orderResource)
        {
            var order = await repository.GetOrder(id);

            if (order is null)
                throw new NotFoundException("Order not found");


            mapper.Map<SaveOrderResource, Order>(orderResource, order);

            order.Date = DateTime.Now;

            await unitOfWork.CompleteAsync();

            //Send confirmation email.

            await email.SendEmailAsync();
          

            order = await repository.GetOrder(order.Id);
            var result = mapper.Map<Order, OrderResource>(order);

            return Ok(result);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await repository.GetOrder(id);

            if (order is null)
                throw new NotFoundException("Order not found");


            repository.Remove(order);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }
    }
}
