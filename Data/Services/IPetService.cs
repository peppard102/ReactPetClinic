using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReactPetClinic.Data
{
    public interface IPetService
    {
        Task<long> AddPet(Pet pet);
        Task<Pet> GetPetById(int id);
        Task<IEnumerable<Pet>> GetAllPets();
        Task<bool> UpdatePet(Pet Pet);
        Task<bool> DeletePet(Pet Pet);
    }
}