import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { FormGroup, Label } from 'reactstrap';
import Select from 'react-select';
import { addDays, toDate, isSaturday, isSunday, startOfDay, addHours, addMinutes, getDay } from 'date-fns';

const sunday = 0;
const saturday = 6;

export class AddAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.resetAppointmentTimeOptions(this.state.apptDate, vet.value, this.state.apptLength.value)
  };

  onChangeApptLength = apptLength => {
    this.setState({ apptLength });
  };

  onChangeApptTime = apptTime => {
    this.setState({ apptTime });
  };

  resetAppointmentTimeOptions(date, vetId, lengthofAppt) {
    let self = this;

    axios.post('/api/Appointment/GetAppointmentTimeOptions', { VetId: vetId, Date: date, lengthOfAppt: lengthofAppt })
      .then(result => {
        var apptTimeOptions = result.data.map((item) => { return { value: item, label: item.hours + ":" + item.minutes.toString().padStart(2, '0') } });

        self.setState({
          apptTimeOptions
        });

        if (apptTimeOptions.length !== 0) // Choose the first option if there is one
          self.setState({
            apptTime: apptTimeOptions[0]
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
    let defaultDate = this.setDefaultDate();
    try {
      let self = this;

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
          let defaultPet = petsResult.length !== 0 ? petsResult[0] : null;
          let defaultVet = vetsResult.length !== 0 ? vetsResult[0] : null;
          let defaultApptLength = apptLengthsResult.length !== 0 ? apptLengthsResult[0] : null;

          self.setState({
            petsList: petsResult,
            vetsList: vetsResult,
            apptLengthOptions: apptLengthsResult,
            pet: defaultPet,
            vet: defaultVet,
            apptLength: defaultApptLength,
          });

          if (defaultVet != null && defaultApptLength != null)
            self.resetAppointmentTimeOptions(defaultDate, defaultVet.value, defaultApptLength.value);

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

    axios.post('/api/Appointment/AddAppointment', {
      PetId: self.state.pet.value,
      VetId: self.state.vet.value,
      StartTime: startTime,
      EndTime: endTime,
    })
      .then(result => {
        return axios.post('/api/Appointment/GetAppointmentTimeOptions', { VetId: self.state.vet.value, Date: self.state.apptDate, lengthOfAppt: self.state.apptLength.value });
      })
      .then(result => {
        self.apptTimeOptions = result.data.map((item) => { return { value: item, text: item } });

        if (self.apptTimeOptions.length !== 0)
          self.state.apptTime = self.apptTimeOptions[0].value;

        self.props.history.push('/allAppointments');
      });
  }

  render() {
    return (
      <div className="trip-form">
        <h3>Add New Appointment</h3>
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
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}