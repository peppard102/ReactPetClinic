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
    public class AppointmentService : IAppointmentService
    {
        private readonly IDbConnection _db;

        public AppointmentService(IDbConnection db)
        {
            _db = db;
        }

        public Appointment GetById(int id)
        {

            return _db.Get<Appointment>(id);
        }
        public List<Appointment> GetAllAppointments()
        {

            return _db.GetAll<Appointment>().ToList();
        }

        public List<AppointmentGrid> GetAppointmentGrid()
        {
            return _db.Query<AppointmentGrid>("up_GetAppointmentGrid",
                commandType: CommandType.StoredProcedure).ToList();
        }

        public List<AppointmentLengthOptions> GetAllAppointmentLengthOptions()
        {

            return _db.GetAll<AppointmentLengthOptions>().ToList();
        }

        public List<TimeSpan> GetAppointmentTimeOptions(AppointmentLengthParams appointment)
        {
            return _db.Query<TimeSpan>("up_GetAvailableTimes", new { VetId = appointment.VetId, Date = appointment.Date, lengthOfAppt = appointment.LengthOfAppt },
                commandType: CommandType.StoredProcedure).ToList();
        }

        public long AddAppointment(Appointment appointment)
        {
            return _db.Insert(appointment);
        }

        public void UpdateAppointment(int id, Appointment appointment)
        {
            appointment.Id = id;
            _db.Update(appointment);
        }

        public void DeleteAppointment(Appointment appointment)
        {
            _db.Delete(appointment);
        }
    }
}