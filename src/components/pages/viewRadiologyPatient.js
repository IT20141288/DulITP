import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './radiology.css';


const Radiology = props => (
  <tr>
        <td>{props.radiology.patientname}</td>
        <td>{props.radiology.nic}</td>
        <td>{props.radiology.email}</td>
        <td>{props.radiology.address}</td>
        <td>{props.radiology.mobilenumber}</td>
        <td>{props.radiology.age}</td>
        <td>{props.radiology.gender}</td>
        <td>{props.radiology.testingname}</td>
    <td>
    <Link to={"/edit/" + props.radiology._id}>edit</Link> | <a href="#" onClick={() => { props.deleteRadiology(props.radiology._id) }}>delete</a>
    </td>
  </tr>
)

export default class ViewRadiologyPatient extends Component {
  constructor(props) {
    super(props);

    this.deleteRadiology = this.deleteRadiology.bind(this)

    this.state = {radiology: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/radiology/')
      .then(response => {
        this.setState({ radiology: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteRadiology(id) {
    axios.delete('http://localhost:5000/radiology/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      radiology: this.state.radiology.filter(el => el._id !== id)
    })
  }

  radiologyList() {
    return this.state.radiology.map(currentradiology => {
      return <Radiology radiology={currentradiology} deleteRadiology={this.deleteRadiology} key={currentradiology._id}/>;
    })
  }

  render() {
    return (
      <div className="container">
        <h3>Radiology and Imaging</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>PatientName</th>
              <th>NIC</th>
              <th>Email</th>
              <th>Address</th>
              <th>MobileNumber</th>
              <th>Age</th>
              <th>Gender</th>
              <th>TestingName</th>
            </tr>
          </thead>
          <tbody>
            { this.radiologyList() }
          </tbody>
        </table>

      </div>
    )
  }
}