using System;
using System.Threading.Tasks;

namespace EpicerieOnline2.EmailSender
{
    public interface ISender
    {
        Task SendEmailAsync();
    }
}
