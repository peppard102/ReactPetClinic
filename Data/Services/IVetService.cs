using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReactPetClinic.Data
{
    public interface IVetService
    {
        Task<long> AddVet(Vet vet);
        Task<Vet> GetVetById(int id);
        Task<IEnumerable<Vet>> GetAllVets();
        Task<bool> UpdateVet(Vet Vet);
        Task<bool> DeleteVet(Vet Vet);
    }
}