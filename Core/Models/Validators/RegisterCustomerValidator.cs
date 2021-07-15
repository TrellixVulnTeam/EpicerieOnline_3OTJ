using System;
using System.Linq;
using EpicerieOnline2.Controllers.Resources;
using EpicerieOnline2.Exceptions;
using EpicerieOnline2.Persistence;
using FluentValidation;

namespace EpicerieOnline2.Core.Models.Validators
{
    public class RegisterCustomerValidator : AbstractValidator<SaveCustomerResourse>
    {

        public RegisterCustomerValidator(EpicerieOnlineDbContext dbContext)
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.Password)
                .MinimumLength(6)
                .MaximumLength(60);

            RuleFor(x => x.Email)
                .Custom((value, context) =>
                {
                   var emailInUse =  dbContext.Customers.Any(c => c.Email == value);

                    if (emailInUse)
                    {
                        //context.AddFailure("Email", "That email is taken");
                        throw new ConflictException("That email is taken");
                    }

                });
        }
    }
}
