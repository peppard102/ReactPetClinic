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