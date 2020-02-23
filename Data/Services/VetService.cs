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
    public class VetService : IVetService
    {
        private readonly IDbConnection _db;

        public VetService(IDbConnection db)
        {
            _db = db;
        }

        public long AddVet(Vet vet)
        {
            return  _db.Insert(vet);
        }

        public Vet GetVetById(int id)
        {
            return _db.Get<Vet>(id);
        }
        public List<Vet> GetAllVets()
        {
            return _db.GetAll<Vet>().ToList();
        }

        public void UpdateVet(Vet vet)
        {
            _db.Update(vet);
        }
        public void DeleteVet(Vet vet)
        {
            _db.Delete(vet);
        }
    }
}