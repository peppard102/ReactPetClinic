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
    public class VetService : IVetService
    {
        private readonly IDbConnection _db;

        public VetService(IDbConnection db)
        {
            _db = db;
        }

        public async Task<long> AddVet(Vet vet)
        {
            return await _db.InsertAsync(vet);
        }

        public async Task<Vet> GetVetById(int id)
        {
            return await _db.GetAsync<Vet>(id);
        }
        public async Task<IEnumerable<Vet>> GetAllVets()
        {
            return await _db.GetAllAsync<Vet>();
        }

        public async Task<bool> UpdateVet(Vet vet)
        {
            return await _db.UpdateAsync(vet);
        }
        public async Task<bool> DeleteVet(Vet vet)
        {
            return await _db.DeleteAsync(vet);
        }
    }
}