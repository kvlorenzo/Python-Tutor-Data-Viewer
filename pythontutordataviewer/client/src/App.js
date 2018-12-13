import React, { Component } from 'react';
import './App.css';
import ProgramList from './components/ProgramList';
import Form from './components/Form';

class App extends Component {
  constructor() {
    super();
    this.state = {programs: []};
  }

  onChange = updatedVal => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedVal
      }
    });
  };

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(programs => this.setState({programs}));
  }

  onSubmit = (fields) => {
    console.log("Fields: ", fields);
  };

  render() {
    return (
      <div className="App">
        <div className="Title">
          <h1>Python Tutor Data Viewer</h1>
        </div>
        <div className="FormArea">
          <Form onSubmit={fields => this.onSubmit(fields)} />
        </div>
        <ProgramList programs={this.state.programs} />
      </div>
    );
  }
}

export default App;

