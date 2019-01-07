import React, {Component} from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      numQueries: ''
    };
    this.handler = this.handler.bind(this);
  }

  handler = (e) => {
    this.props.queryPrograms(this.state);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.handler(e);
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
