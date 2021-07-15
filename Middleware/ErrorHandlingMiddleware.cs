using System;
using System.Threading.Tasks;
using EpicerieOnline2.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace EpicerieOnline2.Middleware
{
    public class ErrorHandlingMiddleware : IMiddleware
    {

        private readonly ILogger<ErrorHandlingMiddleware> _logger;

      
        public ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger;

        }

        public async Task InvokeAsync(HttpContext httpContext, RequestDelegate next)
        {
            try
            {
                await next.Invoke(httpContext);

            }
            catch (BadRequestException e)
            {
                httpContext.Response.StatusCode = 400;
                await httpContext.Response.WriteAsync(e.Message);
            }
            catch(NotFoundException e)
            {
                httpContext.Response.StatusCode = 404;
                await httpContext.Response.WriteAsync(e.Message);
            }
            catch (ConflictException e)
            {
                httpContext.Response.StatusCode = 409;
                await httpContext.Response.WriteAsync(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);

                httpContext.Response.StatusCode = 500;
                await httpContext.Response.WriteAsync("Something went wrong!");
            }
        }
    }


}
