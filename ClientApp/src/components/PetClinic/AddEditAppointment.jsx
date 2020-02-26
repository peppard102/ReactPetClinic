import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Label } from 'reactstrap';
import Select from 'react-select';
import { addDays, toDate, isSaturday, isSunday, startOfDay, addHours, addMinutes, getDay, getHours, getMinutes } from 'date-fns';
import _ from 'lodash';

const sunday = 0;
const saturday = 6;

export class AddAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apptId: null,
      title: "Add New Appointment",
      apptDate: new Date(),
      pet: null,
      vet: null,
      apptLength: null,
      apptTime: null,
      petsList: [],
      vetsList: [],
      apptLengthOptions: [],
      apptTimeOptions: [],
      showAlert: false,
    }
  }

  componentDidMount() {
    this.LoadData();
  }

  isWeekday = date => {
    const day = getDay(date);
    return day !== sunday && day !== saturday;
  };

  onChangePet = pet => {
    this.setState({ pet });
  };

  onChangeVet = vet => {
    this.setState({ vet });
    this.resetAppointmentTimeOptions(this.state.apptDate, vet.value, this.state.apptLength.value);
  };

  onChangeApptLength = apptLength => {
    this.setState({ apptLength });
    this.resetAppointmentTimeOptions(this.state.apptDate, this.state.vet.value, apptLength.value);
  };

  onChangeApptTime = apptTime => {
    this.setState({ apptTime });
  };

  resetAppointmentTimeOptions(date, vetId, lengthofAppt) {
    let self = this;

    if (date && vetId && lengthofAppt) // Only get the appointment lengths if all of the parameters are non-null
      return axios.post('/api/Appointment/GetAppointmentTimeOptions', { VetId: vetId, Date: date, LengthOfAppt: lengthofAppt, ModifyingApptId: parseInt(this.state.apptId) })
        .then(result => {
          var apptTimeOptions = result.data.map((item) => { return { value: item, label: item.hours + ":" + item.minutes.toString().padStart(2, '0') } });

          self.setState({
            apptTimeOptions
          });

          self.setState({
            apptTime: null // Unselect whatever value was previously selected since it might not be available anymore
          });
        });
  };

  onChangeDate = date => {
    this.setState({
      apptDate: startOfDay(date)
    });

    this.resetAppointmentTimeOptions(date, this.state.vet.value, this.state.apptLength.value)
  };

  setDefaultDate() {
    var defaultDate = startOfDay(new Date()); // Get today's date with the time set to midnight

    // If it's Saturday or Sunday, change it to Monday since the clinic is closed weekends 
    if (isSunday(defaultDate))
      defaultDate = toDate(addDays(defaultDate, 1));
    else if (isSaturday(defaultDate))
      defaultDate = toDate(addDays(defaultDate, 2));

    this.setState({
      apptDate: defaultDate
    });

    return defaultDate;
  }

  LoadData() {
    try {
      let self = this;
      const { id } = this.props.match.params;
      this.setState({ apptId: id });

      function getVets() {
        return axios.get('/api/Vet/GetAllVets')
      }

      function getPets() {
        return axios.get('/api/Pet/GetAllPets');
      }

      function getApptLengths() {
        return axios.get('/api/Appointment/GetAllAppointmentLengthOptions');

      }

      axios.all([getPets(), getVets(), getApptLengths()])
        .then(axios.spread(function (petsResult, vetsResult, apptLengthsResult) {
          petsResult = petsResult.data.map((item) => ({ value: item.id, label: item.name }));
          vetsResult = vetsResult.data.map((item) => ({ value: item.id, label: item.firstName + ' ' + item.lastName }));
          apptLengthsResult = apptLengthsResult.data.map((item) => ({ value: item.lengthInMinutes, label: item.lengthInMinutes }));

          self.setState({
            petsList: petsResult,
            vetsList: vetsResult,
            apptLengthOptions: apptLengthsResult
          });

          if (id) // Load the existing appointment if it's an edit
          {
            self.setState({ title: "Edit Appointment" });
            axios.get("api/Appointment/GetAppointmentById/" + id).then(response => {
              const appt = response.data;
              const startTime = new Date(appt.startTime);
              const endTime = new Date(appt.endTime);
              const apptLength = getMinutes(new Date(endTime - startTime));
              const time = getHours(startTime) + ":" + getMinutes(startTime).toString().padStart(2, '0');
              const apptDate = startOfDay(startTime);

              self.resetAppointmentTimeOptions(apptDate, appt.vetId, apptLength).then(response => {
                self.setState({
                  apptDate: apptDate,
                  pet: self.state.petsList.find(x => x.value === appt.petId),
                  vet: self.state.vetsList.find(x => x.value === appt.vetId),
                  apptLength: self.state.apptLengthOptions.find(x => x.value === apptLength),
                  apptTime: self.state.apptTimeOptions.find(x => x.label === time)
                })
              });
            })
          }
          else // Adding a new appointment
          {
            let defaultDate = self.setDefaultDate();
            let defaultPet = petsResult.length !== 0 ? petsResult[0] : null;
            let defaultVet = vetsResult.length !== 0 ? vetsResult[0] : null;
            let defaultApptLength = apptLengthsResult.length !== 0 ? apptLengthsResult[0] : null;

            self.setState({
              pet: defaultPet,
              vet: defaultVet,
              apptLength: defaultApptLength,
            });
            return self.resetAppointmentTimeOptions(defaultDate, defaultVet.value, defaultApptLength.value);
          }
        }));
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit = evt => {
    evt.preventDefault();
    let self = this;
    let selectedDate = self.state.apptDate; // Get only the date part
    let time = self.state.apptTime.value;
    let startTime = addHours(addMinutes(selectedDate, time.minutes), time.hours); // Add the selected time to the selected date
    let endTime = addMinutes(startTime, self.state.apptLength.value); // Add the appt length to the start time to get the end time

    let appointment = {
      PetId: self.state.pet.value,
      VetId: self.state.vet.value,
      StartTime: startTime,
      EndTime: endTime,
    }

    if (this.state.apptId) {
      axios.put('/api/Appointment/UpdateAppointment/' + this.state.apptId, appointment)
        .then(result => {
          self.props.history.push('/');
        });
    }
    else {
      axios.post('/api/Appointment/AddAppointment', appointment)
        .then(result => {
          self.props.history.push('/');
        });
    }
  }

  formComplete = () => {
    let state = this.state;

    return !(state.apptDate && state.pet && state.vet && state.apptLength && state.apptTime)
  }

  render() {
    return (
      <div>
        <h3>{this.state.title}</h3>
        <form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="speciesSelect">Select a Date:</Label>
            <br />
            <DatePicker
              selected={this.state.apptDate}
              onChange={date => this.onChangeDate(date)}
              filterDate={this.isWeekday}
              minDate={new Date()}
            />
          </FormGroup>
          <FormGroup>
            <Label for="petSelect">Select a pet:</Label>
            <Select
              type="select"
              name="petSelect"
              id="petSelect"
              value={this.state.pet}
              onChange={this.onChangePet}
              options={this.state.petsList}>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label for="vetSelect">Select a vet:</Label>
            <Select
              type="select"
              name="vetSelect"
              id="vetSelect"
              value={this.state.vet}
              onChange={this.onChangeVet}
              options={this.state.vetsList}>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label for="apptLengthSelect">Select an appointment length:</Label>
            <Select
              type="select"
              name="apptLengthSelect"
              id="apptLengthSelect"
              value={this.state.apptLength}
              onChange={this.onChangeApptLength}
              options={this.state.apptLengthOptions}>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label for="apptTimeSelect">Select a time:</Label>
            <Select
              type="select"
              name="apptTimeSelect"
              id="apptTimeSelect"
              value={this.state.apptTime}
              onChange={this.onChangeApptTime}
              options={this.state.apptTimeOptions}>
            </Select>
          </FormGroup>
          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" disabled={this.formComplete()} />
          </div>
        </form>
      </div>
    )
  }
}