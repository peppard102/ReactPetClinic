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
    }
}