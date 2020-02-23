using System;
using Microsoft.AspNetCore.Mvc;
using ReactPetClinic.Data;
using System.Collections.Generic;

namespace ReactPetClinic.Controllers 
{
    [Route("api/[controller]")]
    public class PetController : Controller
    {
        private IPetService _service;
        public PetController(IPetService service)
        {
            this._service = service;
        }

        // POST: api/Appointment
        [HttpPost("[action]")]
        public IActionResult AddPet([FromBody]Pet pet)
        {
            _service.AddPet(pet);
            return Ok();
        }

        [HttpGet("[action]")]
        public List<Pet> GetAllPets()
        {
            return _service.GetAllPets();
        }

        // GET: api/Pet/5
        [HttpGet("[action]/{id}")]
        public Pet GetPetById(int id)
        {
            return _service.GetPetById(id);
        }

        // PUT: api/Pet
        [HttpPut("[action]")]
        public Pet UpdatePet([FromBody]Pet value)
        {
            _service.UpdatePet(value);
            return value;
        }

        // DELETE: api/Pet/5
        [HttpDelete("[action]/{id}")]
        public int DeletePet(int id)
        {
            _service.DeletePet(new Pet { Id = id});
            return id;
        }
    }
}