using System.Security.Claims;
using System.Text;
using AutoMapper;
using EpicerieOnline2.Controllers.Resources;
using EpicerieOnline2.Core;
using EpicerieOnline2.Core.Models;
using EpicerieOnline2.Core.Models.Validators;
using EpicerieOnline2.EmailSender;
using EpicerieOnline2.Middleware;
using EpicerieOnline2.Persistence;
using EpicerieOnline2.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace EpicerieOnline2
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ICustomerService, CustomerService>();

            var auth = new AuthenticationSettings();

            Configuration.GetSection("Authentication").Bind(auth);

            services.AddSingleton(auth);

            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = "Bearer";
                option.DefaultScheme = "Bearer";
                option.DefaultChallengeScheme = "Bearer";
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = auth.JwtIssuer,
                    ValidAudience = auth.JwtIssuer,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(auth.JwtKey))
                };
            });


            services.AddScoped<ISender, Sender>();
            services.AddScoped<IItemRepository<Product>, ProductRepository>();
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<IItemRepository<Category>, CategoryRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IOrderRepository, OrderRepository>();

            //AutoMapper
            services.AddAutoMapper();

            
            //Validations
            services.AddFluentValidation();
            services.AddScoped<IValidator<SaveCustomerResourse>, RegisterCustomerValidator>();
            services.AddScoped<IValidator<LoginResource>, RegisterLoginValidator>();


            //Custome middleware
            services.AddScoped<ErrorHandlingMiddleware>();


            //PasswordHasher
            services.AddScoped<IPasswordHasher<Customer>, PasswordHasher<Customer>>();


            //Swegger
            services.AddSwaggerGen();


            //SqlServer
            services.AddDbContext<EpicerieOnlineDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Default")));



            services.AddControllersWithViews().AddNewtonsoftJson();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });



       

        }






        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseHttpsRedirection();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "EpicerieOnline API");
            });

            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();


            //Auth
            app.UseAuthentication();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
