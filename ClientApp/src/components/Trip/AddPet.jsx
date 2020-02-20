import React, {Component} from 'react';
import axios from 'axios';

export class AddPet extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const {history} = this.props;

        let pet = {
            name: this.state.name
        }

        axios.post("api/Pet/AddPet", pet).then(result => {
            history.push('/allAppointments');
        });
    }

    render() {
        return (
            <div className="trip-form">
                <h3>Add New Pet</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Pet name:  </label>
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Pet" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}