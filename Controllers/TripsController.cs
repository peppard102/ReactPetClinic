using System;
using Microsoft.AspNetCore.Mvc;
using Trips.Data;

namespace Trips.Controllers 
{
    [Route("api/[controller]")]
    public class TripsController : Controller
    {
        private ITripService _service;
        public TripsController(ITripService service)
        {
            this._service = service;
        }

        [HttpGet("[action]")]
        public IActionResult GetTrips()
        {
            try 
            {
                // throw new Exception();
                return Ok(_service.GetAllTrips());
            } 
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetTripById/{id}")]
        public IActionResult GetTripById(int id)
        {
            return Ok(_service.GetTripById(id));
        }

        [HttpPost("[action]")]
        public IActionResult AddTrip([FromBody]Trip trip)
        {
            if(trip != null)
            {
                _service.AddTrip(trip);
            }
            return Ok();
        }

        [HttpPut("UpdateTrip/{id}")]
        public IActionResult UpdateTrip(int id, [FromBody]Trip trip)
        {
            if(trip != null)
            {
                _service.UpdateTrip(id, trip);
            }
            return Ok(trip);
        }

        [HttpDelete("DeleteTrip/{id}")]
        public IActionResult DeleteTrip(int id)
        {
            _service.DeleteTrip(id);
            return Ok();
        }
    }
}