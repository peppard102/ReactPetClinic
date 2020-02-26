import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";

import "./custom.css";
import { AllAppointments } from "./components/PetClinic/AllAppointments";
import { AddPet } from "./components/PetClinic/AddPet";
import { AddVet } from "./components/PetClinic/AddVet";
import { AddAppointment } from "./components/PetClinic/AddEditAppointment";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={AllAppointments} />
        <Route path="/addPet" component={AddPet} />
        <Route path="/addVet" component={AddVet} />
        <Route path="/addAppointment" component={AddAppointment} />
        <Route path="/editAppointment/:id" component={AddAppointment} />
      </Layout>
    );
  }
}
