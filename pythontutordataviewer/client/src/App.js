import React, { Component } from 'react';
import './App.css';
import ProgramList from './components/ProgramList';
import Form from './components/Form';

const axios = require('axios');
const url = 'http://localhost:3002/users';

class App extends Component {
  constructor() {
    super();
    this.state = {programs: []};
    this.updatePrograms = this.updatePrograms.bind(this);
    this.queryPrograms = this.queryPrograms.bind(this);
  }

  updatePrograms = () => {
    fetch('/users')
      .then(res => res.json())
      .then(programs => this.setState({programs}));
  };

  componentDidMount() {
    /*fetch('/users')
      .then(res => res.json())
      .then(programs => this.setState({programs}));*/
    this.updatePrograms();
  }

  onSubmit = (fields) => {
    console.log("Fields: ", fields);
  };

  queryPrograms = (query) =>  {
    console.log('Data to send: ' + query);
    axios.post(url, {query})
      .then(res => console.log('Data sent: ' + query))
      .then(this.updatePrograms())
      .catch(err => console.log(err.data));
  };

  render() {
    return (
      <div className="App">
        <div className="Title">
          <h1>Python Tutor Data Viewer</h1>
        </div>
        <div className="FormArea">
          <Form queryPrograms={this.queryPrograms} />
        </div>
        <ProgramList programs={this.state.programs} />
      </div>
    );
  }
}

export default App;

