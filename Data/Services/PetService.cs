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
    }
}