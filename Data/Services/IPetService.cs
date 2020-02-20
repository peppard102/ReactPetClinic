using System.Collections.Generic;
using System;

namespace ReactPetClinic.Data
{
    public interface IPetService
    {
        long AddPet(Pet pet);
    }
}