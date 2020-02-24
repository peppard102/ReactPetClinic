import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { FormGroup, Label } from 'reactstrap';
import Select from 'react-select';
import { addDays, toDate, getDay, isSaturday, isSunday, getTime, startOfDay, addHours, addMinutes } from 'date-fns';

const sunday = 0;
const saturday = 6;

export class AddAppointment extends Component {
  constructor(props) {
    super(props);

    this.setStartDate = this.setStartDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      apptDate: new Date(),
      pet: "",
      vet: null,
      apptLength: null,
      apptTime: null,
      petsList: [],
      vetsList: [],
      apptLengthOptions: [],
      apptTimeOptions: [],
      disabledDates: {
        to: moment().add(-1, 'd').toDate(), // Disable all dates before today
        days: [6, 0] // Disable weekends 
        //days: [0] // Disable weekends 
      },
      showAlert: false,
    }
  }

  componentDidMount() {
    this.LoadData();
  }

  onChangePet = pet => {
    this.setState({ pet });
  };

  onChangeVet = vet => {
    this.setState({ vet });
  };

  onChangeApptLength = apptLength => {
    this.setState({ apptLength });
  };

  onChangeApptTime = apptTime => {
    this.setState({ apptTime });
  };

  setStartDate = date => {
    let self = this;

    self.setState({
      apptDate: startOfDay(date)
    });



    axios.post('/api/Appointment/GetAppointmentTimeOptions', { VetId: self.state.vet.value, Date: date, lengthOfAppt: self.state.apptLength.value })
      .then(result => {
        var apptTimeOptions = result.data.map((item) => { return { value: item, label: item.hours + ":" + item.minutes.toString().padStart(2, '0') } });

        self.setState({
          apptTimeOptions
        });

        if (apptTimeOptions.length != 0) // Choose the first option if there is one
          self.setState({
            apptTime: apptTimeOptions[0]
          });
      })
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
  }

  LoadData() {
    this.setDefaultDate();
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
        .then(axios.spread(function (petsResult, vetsResult, ApptLengthsResult) {
          self.setState({
            petsList: petsResult.data.map((item) => ({ value: item.id, label: item.name })),
            vetsList: vetsResult.data.map((item) => ({ value: item.id, label: item.firstName + ' ' + item.lastName })),
            apptLengthOptions: ApptLengthsResult.data.map((item) => ({ value: item.lengthInMinutes, label: item.lengthInMinutes }))
          });

          // Set defaults
          // if (self.state.petsList.length != 0)
          //   self.setState({
          //     pet: self.state.petsList[0]
          //   });

          // if (self.state.vetsList.length != 0)
          //   self.setState({
          //     vet: self.state.vetsList[0]
          //   });

          // if (self.state.apptLengthOptions.length != 0)
          //   self.setState({
          //     apptLength: self.state.apptLengthOptions[0]
          //   });

          let tripObject = {
            VetId: self.state.vet.value,
            Date: self.state.apptDate,
            LengthOfAppt: self.state.apptLength.value
          }

          return axios.post('/api/Appointment/GetAppointmentTimeOptions', tripObject);
        })).then(result => {
          var apptTimeOptions = result.data.map((item) => { return { value: item, label: item.hours + ":" + item.minutes.toString().padStart(2, '0') } });

          self.setState({
            apptTimeOptions
          });

          if (apptTimeOptions.length != 0) // Choose the first option if there is one
            self.setState({
              apptTime: apptTimeOptions[0]
            });
        });

    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(evt) {
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

        if (self.apptTimeOptions.length != 0)
          self.state.apptTime = self.apptTimeOptions[0].value;

        this.showAlert = true;

        setTimeout(function () {
          self.showAlert = false
        }, 3000);
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
              onChange={date => this.setStartDate(date)}
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