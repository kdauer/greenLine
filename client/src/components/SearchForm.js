import React, { Component } from "react";
import axios from "axios";
import Autocomplete from "./Autocomplete";

export class SearchForm extends Component {
  state = {
    date: new Date(),
    from: "",
    to: "",
    
    class: "",
    travellers: "",
    resultTo: [],
    resultFrom: []
  };

  handleChange = e => {
    console.log(e.target);

    const date = e.target.value;
    const stringDate = new Date(date).toISOString().slice(0, -1);
    this.setState({
      date: stringDate
    });
    // console.log(this.state.date);
  };

  handleSubmit = event => {
    event.preventDefault();
    // date: this.state.date
    // let date = this.state.date.slice(0, 16);
    console.log("searchdate:", this.state.date.slice(0, 16));

    axios
      .post("/api/price", { date: this.state.date.slice(0, 16) })
      .then(res => {
        console.log("RESPONSE:", res);
      });
 
  };

  getStations = direction => {
    axios.get("/stations").then(response => {
      let filtered = response.data.filter(el => {
        return el.name
          .toLowerCase()
          .includes(this.state[direction].toLowerCase());
      });

      if (direction == "to") {
        this.setState({
          resultTo: filtered
        });
      } else {
        this.setState({
          resultFrom: filtered
        });
      }
    });
  };

  handleInputChange = direction => {
    let target = direction.target.name;
    this.setState(
      {
        [direction.target.name]: direction.target.value
      },
      () => {
        this.getStations(target);
      }
    );
  };

  updateText = text => {
    this.setState({
      from: text,
      resultFrom: []
    });
  };

  updateTo = text => {
    this.setState({
      to: text,
      resultTo: []
    });
  };

  submit = event => {
    event.preventDefault();
  };

  render() {
    console.log(this.state.date);
    return (
      <div>
<<<<<<< HEAD
        <form onSubmit={this.handleSubmit}>
          {/* <label htmlFor="From">From</label>
          <input name="from" id="from" value="" onChange="" />
=======
        <form>
          <label htmlFor="From">From</label>
          <Autocomplete
            name="from"
            id="from"
            handleInputChange={this.handleInputChange}
            updateText={this.updateText}
            results={this.state.resultFrom}
            value={this.state.from}
          />
>>>>>>> d9546df1b91163e7f2eee9c08e8d49c49eead426
          <button>switch</button>
          <label htmlFor="To">To</label>

          <Autocomplete
            name="to"
            id="to"
            handleInputChange={this.handleInputChange}
            updateText={this.updateTo}
            results={this.state.resultTo}
            value={this.state.to}
          />
          <label htmlFor="Date">Date </label>
<<<<<<< HEAD
          <select name="select-date">
            <option value="Day">
              Day <input type="date" />
            </option>
            <option value="Month">Month</option>
          </select> */}
          <label htmlFor="Date">Date </label>
          <input
            type="datetime-local"
            // type="date"
            id="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
          {/* <input
            id="content"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
          /> */}

          <button type="submit">Submit, Menna!</button>
=======
          <input type="datetime-local" />
          <select>
            <option value="E">Adults</option>
            <option value="K">Children</option>
            <option value="B">Baby</option>
          </select>
          <button onClick={this.submit}>Search</button>
>>>>>>> d9546df1b91163e7f2eee9c08e8d49c49eead426
        </form>
      </div>
    );
  }
}

export default SearchForm;
