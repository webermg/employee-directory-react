import logo from './logo.svg';
import './App.css';
import Table from './components/Table';
import React, { Component } from 'react';
import API from './util/API';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  getPeople() {
    API.search()
      .then(res => this.setState({ data: res.data.results }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getPeople();
  }

  render() {
    console.log(this.state.data)
    return (
      <div>
    <div className="jumbotron">
    <h1 className="display-4">Employee Directory</h1>
    <p className="lead">Click on carrots to filter by heading or use the search box to narrow your results</p>
  
    </div>
    <div className="container">

    <Table data={this.state.data}/>
    </div>
    </div>
  );
}
}

export default App;
