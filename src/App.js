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
      filtered: [],
      filter:"",
      sorted:{
        name:0,
        phone:0,
        email:0,
        dob:0
      }
    }
  }

  formatDate(date) {
    const temp = date.split(/[-T]/);
    return `${temp[1]}/${temp[2]}/${temp[0]}`
  }


  getPeople() {
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
          filtered:items
        })
      })
      .catch(err => console.log(err));
  }

  sortData = (field, asc, newSort) => {
    let temp = this.state.filtered.map(item => {
      return Object.assign({}, item)
    });
    temp.sort((item1, item2) => {
      if (item1[field] > item2[field]) return asc;
      else return -asc;
    })
    this.setState({ 
      filtered: temp,
      sorted:newSort
    });
  }

  onHeaderClick = (field) => {
    let asc = this.state.sorted[field] <= 0 ? 1 : -1;
    const newSort = {...this.state.sorted};
    console.log(newSort)
    for (const key in newSort) {
      newSort[key] = 0;
    }
    newSort[field] = asc
    this.sortData(field, asc, newSort);
  }

  componentDidMount() {
    this.getPeople();
  }

  handleChange = (event) => {
    
    const { name, value } = event.target;
    const filteredData = this.state.data.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
    this.setState({
      [name]: value,
      filtered:filteredData
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Input value={this.state.filter} name="filter" type="text" title="search" onChange={this.handleChange} />
          <Table status={this.state.sorted} data={this.state.filtered} onClick={this.onHeaderClick} />
        </div>
      </div>
    );
  }
}

export default App;
