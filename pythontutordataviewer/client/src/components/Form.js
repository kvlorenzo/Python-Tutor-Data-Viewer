import React, {Component} from 'react';

const axios = require('axios');
const url = 'http://localhost:3002/users';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      numQueries: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    console.log('Data to send: ' + data);
    axios.post(url, {data})
      .then(res => console.log('Data sent: ' + data))
      .catch(err => console.log(err.data));
  };

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log('New input: ' + this.state);
  };

  render() {
    return (
      <form>
        Search: <br />
        <input 
          type='text'
          name='query'
          placeholder='Search keywords' 
          onChange={this.handleInputChange}
        /> <br />
        Number of Searches: <br />
        <input 
          type='number'
          name='numQueries' 
          min='1'
          placeholder='(Default: 20)'
          onChange={this.handleInputChange}
        /> <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default Form;
