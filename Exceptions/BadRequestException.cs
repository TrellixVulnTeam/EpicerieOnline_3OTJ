using System;
namespace EpicerieOnline2.Exceptions
{
    public class BadRequestException : Exception
    {
        public BadRequestException(string message): base(message)
        {
        }
    }
}
