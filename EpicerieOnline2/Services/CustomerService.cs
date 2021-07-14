using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using EpicerieOnline2.Controllers.Resources;
using EpicerieOnline2.Core;
using EpicerieOnline2.Core.Models;
using EpicerieOnline2.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EpicerieOnline2.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<Customer> _passwordHasher;
        private readonly ICustomerRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly AuthenticationSettings _authenticationSettings;

        public CustomerService(
            IMapper mapper,
            IPasswordHasher<Customer> passwordHasher,
            ICustomerRepository repository,
            IUnitOfWork unitOfWork,
            AuthenticationSettings authenticationSettings)
        {
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _repository = repository;
            _unitOfWork = unitOfWork;
            _authenticationSettings = authenticationSettings;
        }


        //Generate JWT
        public string GenerateJwt(LoginResource login)
        {
            //Get customer by mail
            var customer = _repository.GetItem(login.Email);

            if(customer is null)
            {
                throw new BadRequestException("Invalid username or password");
            }

            //Verification password
            var result = _passwordHasher.VerifyHashedPassword(customer, customer.PasswordHash, login.Password);

            if (result == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Invalid username or password");
            }

            //Configuration claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, customer.Id.ToString()),
                new Claim(ClaimTypes.Name, customer.Email.ToString()),
                new Claim(ClaimTypes.Role, customer.Role.ToString()),

            };


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

            var token = new JwtSecurityToken(
                _authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: cred
                );

            var tokenHandler = new JwtSecurityTokenHandler();


            //Creation JSON object for sending to the client after the login
            var response = new
            {
                UserId = customer.Id,
                UserRoleId = customer.RoleId,
                UserEmail = customer.Email,
                Token = tokenHandler.WriteToken(token)
            };


            string json = JsonConvert.SerializeObject(response);

            return json;
        }




        //Create Customer
        public async Task<SaveCustomerResourse> CreateCustomer(SaveCustomerResourse customerResourse)
        {
            //Mapping from client to domain
            var customer = _mapper.Map<SaveCustomerResourse, Customer>(customerResourse);

            //Hashing password from client
            var hasherdPassword = _passwordHasher.HashPassword(customer, customerResourse.Password);

            //Adding hashed password before sending to database
            customer.PasswordHash = hasherdPassword;

            //Adding new customer to database
            _repository.Add(customer);
            await _unitOfWork.CompleteAsync();

            //Get last added customer
            customer = await _repository.GetItem(customer.Id);

            //Mapping from domain to client
            var result = _mapper.Map<Customer, SaveCustomerResourse>(customer);

            return result;
        }




        //Get one Customer
        public async Task<SaveCustomerResourse> GetCustomer(int id)
        {
            //Get one customer from domain by id
            var customer = await _repository.GetItem(id);

            //If there is no customer with this id, throw exception
            if (customer is null)
                throw new NotFoundException("Customer not found");

            //Mapping from domain to client 
            var customerResource = _mapper.Map<Customer, SaveCustomerResourse>(customer);

            return customerResource;
        }




        //Get all Customers
        public async Task<IEnumerable<SaveCustomerResourse>> GetCustomers()
        {
            //Get all customers from domain
            var customer = await _repository.GetItems();

            return _mapper.Map<IEnumerable<Customer>, IEnumerable<SaveCustomerResourse>>(customer);
        }




        //Update Customer
        public async Task<SaveCustomerResourse> UpdateCustomer(int id, [FromBody] SaveCustomerResourse customerResource)
        {
            //Find customer by id
            var customer = await _repository.GetItem(id);

            //Throw exceptopn if not find
            if (customer is null)
                throw new NotFoundException("Customer not found");

            //Mapping from client to domain
            _mapper.Map<SaveCustomerResourse, Customer>(customerResource, customer);

            //Update customer
            await _unitOfWork.CompleteAsync();

            //Get last updated customer
            customer = await _repository.GetItem(customer.Id);

            //Return mapped last added customer to the client
            var result = _mapper.Map<Customer, SaveCustomerResourse>(customer);

            return result;
        }




        public async void DeleteCustomer(int id)
        {
            //Find customer by id
            var customer = await _repository.GetItem(id);

            //Throw exceptopn if not find

            if (customer is null)
                throw new NotFoundException("Customer not found");

            //Remove customer 
            _repository.Remove(customer);
            await _unitOfWork.CompleteAsync();
        }

      
    }
}
