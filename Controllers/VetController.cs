using System;
using Microsoft.AspNetCore.Mvc;
using ReactPetClinic.Data;
using System.Collections.Generic;

namespace ReactPetClinic.Controllers 
{
    [Route("api/[controller]")]
    public class VetController : Controller
    {
        private IVetService _service;
        public VetController(IVetService service)
        {
            this._service = service;
        }

        // POST: api/Appointment
        [HttpPost("[action]")]
        public IActionResult AddVet([FromBody]Vet vet)
        {
            _service.AddVet(vet);
            return Ok();
        }

        [HttpGet("[action]")]
        public List<Vet> GetAllVets()
        {
            return _service.GetAllVets();
        }

        // GET: api/Pet/5
        [HttpGet("[action]/{id}")]
        public Vet GetVetById(int id)
        {
            return _service.GetVetById(id);
        }

        // PUT: api/Pet
        [HttpPut("[action]")]
        public Vet UpdateVet([FromBody]Vet value)
        {
            _service.UpdateVet(value);
            return value;
        }

        // DELETE: api/Pet/5
        [HttpDelete("[action]/{id}")]
        public int DeleteVet(int id)
        {
            _service.DeleteVet(new Vet { Id = id});
            return id;
        }

        // [HttpGet("GetTripById/{id}")]
        // public IActionResult GetTripById(int id)
        // {
        //     return Ok(_service.GetTripById(id));
        // }

        // [HttpPost("[action]")]
        // public IActionResult AddTrip([FromBody]Trip trip)
        // {
        //     if(trip != null)
        //     {
        //         _service.AddTrip(trip);
        //     }
        //     return Ok();
        // }

        // [HttpPut("UpdateTrip/{id}")]
        // public IActionResult UpdateTrip(int id, [FromBody]Trip trip)
        // {
        //     if(trip != null)
        //     {
        //         _service.UpdateTrip(id, trip);
        //     }
        //     return Ok(trip);
        // }

        // [HttpDelete("DeleteTrip/{id}")]
        // public IActionResult DeleteTrip(int id)
        // {
        //     _service.DeleteTrip(id);
        //     return Ok();
        // }
    }
}