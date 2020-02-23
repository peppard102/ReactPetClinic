using System.Collections.Generic;
using System;

namespace ReactPetClinic.Data
{
    public interface IPetService
    {
        long AddPet(Pet pet);
        Pet GetPetById(int id);
        List<Pet> GetAllPets();
        void UpdatePet(Pet Pet);
        void DeletePet(Pet Pet);
    }
}