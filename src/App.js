// •	GET (fetching data) --> You can use params or queries to request data.
// •	PUT (Modifying data using URL) --> You can alter data by sending new data to the server as a body, param, or query.
// •	POST (Adding data via body) --> You can add new data to the server which is sent as a body, param, or query.
// •	DELETE (deleting data via url) --> You can specify data to be deleted from the server by sending a param or query.

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // num: 0
      people: [],
      input: '',
      char: ''
    };
    // console.log("constructor");

    // this.increase = this.increase.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.getData = this.getData.bind(this);
    this.getChar = this.getChar.bind(this);
  }

  // componentDidMount() {
  //   console.log("Did Mount");
  // }

  // increase() {
  //   this.setState({ num: this.state.num + 1 });
  // }

  componentDidMount() {
    let promise = axios.get('https://swapi.co/api/people/');
    promise.then(response => {
      console.log(response);
      this.setState({ people: response.data.results });
    });
  }

  // Example using Query
  getData() {
    let num = this.state.input || 1;
    // Query is defined with a ?name=val. Queries can be numbers or strings.
    let promise = axios.get(`https://swapi.co/api/people/?page=${num}`);
    promise.then(response => {
      this.setState({ people: response.data.results });
    });
  }

  // Example of Post with a body. In general, external APIs will not allow you to post or put data on their servers. Therefore this will not work with swapi. Also notice the use of .catch, this allows us to see if something went wrong with the request.
  postData() {
    // The body is an object containing the relevant data used as the second arguement to the axios request.
    axios
      .post(`https://swapi.co/api/people`, {
        character: { name: 'Erik Golden' }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }

  // Example using Params
  getChar() {
    let num = this.state.input || 1;
    // Param is defined as a number at the end of the url
    let promise = axios.get(`https://swapi.co/api/people/${num}`);
    promise.then(response => {
      console.log(response.data.name);

      this.setState({ char: response.data.name });
    });
  }

  handleInput(e) {
    this.setState({ input: e.target.value });
  }

  render() {
    // console.log("render");

    let people = this.state.people.map((e, i) => {
      // Notice the use of a key? This will remove the warning from your console. React uses this key to monitor the index of each mapped item.
      return (
        <h2 className="person" key={i}>
          {e.name}
        </h2>
      );
    });
    console.log(this.state.people);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <div style={{ color: 'white' }}>{this.state.char}</div>
        </header>
        {/* <h1>{this.state.num}</h1>
        <button value={this.state.num} onClick={this.increase}>
          increase number
    </button> */}
        <div>
          <input placeholder="Enter Char Id" onChange={this.handleInput} />
          <button onClick={this.getChar}>Get Character</button>
        </div>
        <div>
          <input placeholder="Pick a number 1-3" onChange={this.handleInput} />
          <button onClick={this.getData}>Get Data</button>
        </div>

        {people}
      </div>
    );
  }
}

export default App;
