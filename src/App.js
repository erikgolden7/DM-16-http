import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      people: [],
      input: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    let promise = axios.get('https://swapi.co/api/people');
    promise.then(response => {
      console.log(response.data.results);
      this.setState({ people: response.data.results });
    });
  }

  handleInput(e) {
    this.setState({ input: e.target.value });
  }

  getData() {
    let num = this.state.input || 1;
    axios.get(`https://swapi.co/api/people/?page=${num}`).then(res => {
      this.setState({ people: res.data.results });
    });
  }

  render() {
    console.log(this.state.people);

    let people = this.state.people.map((e, i) => {
      return (
        <div className="person">
          <h2>{e.name}</h2>
          <h5>{e.birth_year}</h5>
        </div>
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <input placeholder="Pick a number 1-3" onChange={this.handleInput} />
        <button onClick={this.getData}> Get Data </button>
        {people}
      </div>
    );
  }
}

export default App;
