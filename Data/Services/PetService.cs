using System.Collections.Generic;
using System.Linq;
using Dapper;
using System;
using System.Data.SqlClient;
using System.Data;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Configuration;

namespace ReactPetClinic.Data
{
    public class PetService : IPetService
    {
        private readonly IDbConnection _db;

        public PetService(IDbConnection db)
        {
            _db = db;
        }

        public long AddPet(Pet pet)
        {
            return  _db.Insert(pet);
        }

        public Pet GetPetById(int id)
        {
            return _db.Get<Pet>(id);
        }
        public List<Pet> GetAllPets()
        {
            return _db.GetAll<Pet>().ToList();
        }

        public void UpdatePet(Pet pet)
        {
            _db.Update(pet);
        }
        public void DeletePet(Pet pet)
        {
            _db.Delete(pet);
        }
    }
}