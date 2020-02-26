using System.Collections.Generic;
using System.Linq;
using Dapper;
using System;
using System.Data.SqlClient;
using System.Data;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace ReactPetClinic.Data
{
    public class PetService : IPetService
    {
        private readonly IDbConnection _db;

        public PetService(IDbConnection db)
        {
            _db = db;
        }

        public async Task<long> AddPet(Pet pet)
        {
            return await _db.InsertAsync(pet);
        }

        public async Task<Pet> GetPetById(int id)
        {
            return await _db.GetAsync<Pet>(id);
        }
        public async Task<IEnumerable<Pet>> GetAllPets()
        {
            return await _db.GetAllAsync<Pet>();
        }

        public async Task<IEnumerable<Species>> GetAllSpecies()
        {
            return await _db.GetAllAsync<Species>();
        }

        public async Task<bool> UpdatePet(Pet pet)
        {
            return await _db.UpdateAsync(pet);
        }
        public async Task<bool> DeletePet(Pet pet)
        {
            return await _db.DeleteAsync(pet);
        }
    }
}