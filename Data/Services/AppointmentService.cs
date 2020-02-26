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
    public class AppointmentService : IAppointmentService
    {
        private readonly IDbConnection _db;

        public AppointmentService(IDbConnection db)
        {
            _db = db;
        }

        public async Task<Appointment> GetById(int id)
        {

            return await _db.GetAsync<Appointment>(id);
        }
        public async Task<IEnumerable<Appointment>> GetAllAppointments()
        {

            return await _db.GetAllAsync<Appointment>();
        }

        public async Task<IEnumerable<AppointmentGrid>> GetAppointmentGrid()
        {
            return await _db.QueryAsync<AppointmentGrid>("up_GetAppointmentGrid",
                commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<AppointmentLengthOptions>> GetAllAppointmentLengthOptions()
        {

            return await _db.GetAllAsync<AppointmentLengthOptions>();
        }

        public async Task<IEnumerable<TimeSpan>> GetAppointmentTimeOptions(AppointmentLengthParams appointment)
        {
            return await _db.QueryAsync<TimeSpan>("up_GetAvailableTimes",
                new { VetId = appointment.VetId, Date = appointment.Date, LengthOfAppt = appointment.LengthOfAppt, ModifyingApptId = appointment.ModifyingApptId },
                commandType: CommandType.StoredProcedure);
        }

        public async Task<long> AddAppointment(Appointment appointment)
        {
            return await _db.InsertAsync(appointment);
        }

        public async Task<bool> UpdateAppointment(int id, Appointment appointment)
        {
            appointment.Id = id;
            return await _db.UpdateAsync(appointment);
        }

        public async Task<bool> DeleteAppointment(Appointment appointment)
        {
            return await _db.DeleteAsync(appointment);
        }
    }
}