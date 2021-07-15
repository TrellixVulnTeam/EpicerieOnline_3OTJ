using System;
using EpicerieOnline2.Controllers.Resources;
using EpicerieOnline2.Persistence;
using FluentValidation;

namespace EpicerieOnline2.Core.Models.Validators
{
    public class RegisterLoginValidator : AbstractValidator<LoginResource >
    {
        public RegisterLoginValidator(EpicerieOnlineDbContext dbContext)
        {

            RuleFor(x => x.Email)
              .NotEmpty()
              .EmailAddress();

            RuleFor(x => x.Password)
                .MinimumLength(6)
                .MaximumLength(60);

        }
    }
}
