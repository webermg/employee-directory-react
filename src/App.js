import './App.css';
import Table from './components/Table';
import React, { Component } from 'react';
import API from './util/API';
import Header from './components/Header';
import Input from './components/Input';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filteredData: [],
      filter:"",
      sortedState:{
        name:0,
        phone:0,
        email:0,
        dob:0
      }
    }
  }

  

  //-----------lifecycle--------------

  componentDidMount() {
    API.search()
      .then(res => {
        let items = res.data.results.map(item => {
          return {
            image: item.picture.thumbnail,
            name: item.name.first + " " + item.name.last,
            phone: item.phone,
            email: item.email,
            dob: this.formatDate(item.dob.date)
          }
        })
        this.setState({ 
          data: items,
          filteredData:items
        })
      })
      .catch(err => console.log(err));
  }

  //-----------event handlers--------------

  onHeaderClick = (field) => {
    let dir = this.state.sortedState[field] <= 0 ? 1 : -1;
    const newSortedState = this.getNewSortedState(field,dir);
    const newData = this.getSortedData(field, dir);
    const newFilteredData = this.state.filter !== "" ? this.getFilteredData(this.state.filter) : newData;
    this.setState({
      data:newData,
      filteredData:newFilteredData,
      sortedState:newSortedState
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const newFilteredData = this.getFilteredData(value)
    this.setState({
      [name]: value,
      filteredData:newFilteredData
    });
  }

  //--------------utilities-----------------

  //returns date in mm/dd/yyyy format
  formatDate(date) {
    const temp = date.split(/[-T]/);
    return `${temp[1]}/${temp[2]}/${temp[0]}`
  }

  //returns sorted data array
  getSortedData = (field, dir) => {
    let copy = this.state.data.map(item => {
      return Object.assign({}, item)
    });
    copy.sort((item1, item2) => {
      if (item1[field] > item2[field]) return dir;
      else return -dir;
    })
    return copy;
  }

  //returns array of sorted states
  getNewSortedState = (field, dir) => {
    const newSort = {...this.state.sortedState};
    for (const key in newSort) {
      newSort[key] = 0;
    }
    newSort[field] = dir
    return newSort;
  }

  getFilteredData = filterStr => {
    return this.state.data.filter(item => item.name.toLowerCase().includes(filterStr.toLowerCase()))
  }

  //-----------------render-----------

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Input value={this.state.filter} name="filter" type="text" title="search" onChange={this.handleChange} />
          <Table status={this.state.sortedState} data={this.state.filteredData} onClick={this.onHeaderClick} />
        </div>
      </div>
    );
  }
}

export default App;
