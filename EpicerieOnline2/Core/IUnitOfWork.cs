using System.Threading.Tasks;

namespace EpicerieOnline2.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}