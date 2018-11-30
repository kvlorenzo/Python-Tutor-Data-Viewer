import React, { Component } from 'react';
import './App.css';
import ProgramList from './components/ProgramList';

class App extends Component {
  constructor() {
    super();
    this.state = {programs: []};
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(programs => this.setState({programs}));
  }

  render() {
    return (
      <div className="App">
        <div className="Title">
          <h1>Python Tutor Data Viewer</h1>
        </div>
        <div className="Keys">
          Color key:<br /> 
          Red = From bad code<br />; 
          Green = Additions to fixed code<br />
        </div>
        <ProgramList programs={this.state.programs} />
      </div>
    );
  }
}

export default App;
