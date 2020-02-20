using System;
using Microsoft.AspNetCore.Mvc;
using ReactPetClinic.Data;
using System.Collections.Generic;

namespace ReactPetClinic.Controllers 
{
    [Route("api/[controller]")]
    public class AppointmentController : Controller
    {
        private IAppointmentService _service;
        public AppointmentController(IAppointmentService service)
        {
            this._service = service;
        }

        [HttpGet("[action]")]
        public IActionResult GetAllAppointments()
        {
            try 
            {
                // throw new Exception();
                return Ok(_service.GetAllAppointments());
            } 
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetAppointmentGrid")]
        public List<AppointmentGrid> GetAppointmentGrid()
        {
            return _service.GetAppointmentGrid();
        }

        [HttpGet]
        [Route("lengthOptions")]
        public List<AppointmentLengthOptions> GetAllAppointmentLengthOptions()
        {
            return _service.GetAllAppointmentLengthOptions();
        }

        // GET: api/Appointment/5
        [HttpGet("{id}")]
        public Appointment GetAppointment(int id)
        {
            return _service.GetById(id);
        }
        
        // GET: api/Appointment/5
        [HttpPost]
        [Route("timeOptions")]
        public List<TimeSpan> GetAppointmentTimeOptions([FromBody]AppointmentLengthParams apptLengthParams)
        {
            return _service.GetAppointmentTimeOptions(apptLengthParams);
        }

        // POST: api/Appointment
        [HttpPost]
        public Appointment PostAppointment([FromBody]Appointment value)
        {
            value.StartTime = value.StartTime.ToLocalTime();
            value.EndTime = value.EndTime.ToLocalTime();
            _service.AddAppointment(value);
            return value;
        }

        // PUT: api/Appointment
        [HttpPut]
        public Appointment PutAppointment([FromBody]Appointment value)
        {
            _service.UpdateAppointment(value);
            return value;
        }

        // DELETE: api/Appointment/5
        [HttpDelete("{id}")]
        public int DeleteAppointment(int id)
        {
            _service.DeleteAppointment(new Appointment { Id = id});
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