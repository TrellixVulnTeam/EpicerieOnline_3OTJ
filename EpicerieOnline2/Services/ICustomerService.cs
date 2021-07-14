using System.Collections.Generic;
using System.Threading.Tasks;
using EpicerieOnline2.Controllers.Resources;
using Microsoft.AspNetCore.Mvc;

namespace EpicerieOnline2.Services
{
    public interface ICustomerService
    {
        Task<SaveCustomerResourse> CreateCustomer(SaveCustomerResourse customerResourse);
        void DeleteCustomer(int id);
        Task<SaveCustomerResourse> GetCustomer(int id);
        Task<IEnumerable<SaveCustomerResourse>> GetCustomers();
        Task<SaveCustomerResourse> UpdateCustomer(int id, [FromBody] SaveCustomerResourse customerResource);
        string GenerateJwt(LoginResource login);
    }
}