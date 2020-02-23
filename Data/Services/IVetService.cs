using System.Collections.Generic;

namespace ReactPetClinic.Data
{
    public interface IVetService
    {
        long AddVet(Vet vet);
        Vet GetVetById(int id);
        List<Vet> GetAllVets();
        void UpdateVet(Vet Vet);
        void DeleteVet(Vet Vet);
    }
}