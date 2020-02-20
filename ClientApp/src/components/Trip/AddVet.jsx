import React, {Component} from 'react';
import axios from 'axios';

export class AddVet extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
        }
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const {history} = this.props;

        let vet = {
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }

        axios.post("api/Vet/AddVet", vet).then(result => {
            history.push('/allAppointments');
        });
    }

    render() {
        return (
            <div className="trip-form">
                <h3>Add New Vet</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name:  </label>
                        <input type="text" className="form-control" value={this.state.firstName} onChange={this.onChangeFirstName}/>
                    </div>
                    <div className="form-group">
                        <label>Last Name:  </label>
                        <input type="text" className="form-control" value={this.state.lastName} onChange={this.onChangeLastName}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Vet" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}