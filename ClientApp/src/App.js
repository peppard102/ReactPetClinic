import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import './custom.css'
import { AllAppointments } from './components/Trip/AllAppointments';
import { AddPet } from './components/Trip/AddPet';
import { AddVet } from './components/Trip/AddVet';
import { AddAppointment } from './components/Trip/AddAppointment';
import { Update } from './components/Trip/Update';
import { Delete } from './components/Trip/Delete';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/allAppointments' component={AllAppointments} />
        <Route path='/addPet' component={AddPet} />
        <Route path='/addVet' component={AddVet} />
        <Route path='/addAppointment' component={AddAppointment} />
        <Route path='/update/:id' component={Update} />
        <Route path='/delete/:id' component={Delete} />
      </Layout>
    );
  }
}
