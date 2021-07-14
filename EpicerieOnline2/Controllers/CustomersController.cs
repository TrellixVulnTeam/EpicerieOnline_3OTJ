using EpicerieOnline2.Controllers.Resources;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EpicerieOnline2.Services;

namespace EpicerieOnline2.Controllers
{

    [Route("/api/customers")]
    [ApiController]
    public class CustomersController : Controller
    {
        private readonly ICustomerService _customerService;


        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginResource login)
        {
            string token = _customerService.GenerateJwt(login);

            return Ok(token);

        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateCustomer([FromBody] SaveCustomerResourse customerResourse)
        {
           var result = await _customerService.CreateCustomer(customerResourse);

           return Ok(result);
        }



        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetCustomer(int id)
        {
           var result = await _customerService.GetCustomer(id);

           return Ok(result);
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetCustomers()
        {
           var result = await _customerService.GetCustomers();

           return Ok(result);
        }



        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateCustomer(int id, [FromBody] SaveCustomerResourse customerResource)
        {
           var result = await _customerService.UpdateCustomer(id, customerResource);

           return Ok(result);
        }



        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult DeleteCustomer(int id)
        {
           _customerService.DeleteCustomer(id);

           return Ok(id);
        }



    }
}
