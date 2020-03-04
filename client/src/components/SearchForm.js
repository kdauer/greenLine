import React, { Component } from "react";
import axios from "axios";
import Autocomplete from "./Autocomplete";
import Results from "./Results";
import { Link } from "react-router-dom";

export class SearchForm extends Component {
  state = {
    date: "",
    from: "",
    to: "",
    toId: "",
    fromId: "",
    class: "",
    travelers: "",
    resultTo: [],
    resultFrom: [],
    id: "",
    savedJourney: [],
    resultData: [],
    firstClass: []
  };

  handleChange = e => {
    const date = e.target.value;
    this.setState({
      date: date
    });
  };
  // searchFavorites=e=>{
  //   this.setState({
  //     toId:e.originId,
  //     toId:this.props.
  //   })
  // }

  handleSubmit = event => {
    this.setState({
      resultData: []
    });
    event.preventDefault();

    let newFromId = this.state.fromId;
    if (!newFromId) newFromId = this.state.from;

    let newToId = this.state.toId;
    let date;
    if (!newToId) newToId = this.state.to;
    // for(let i=0;i<3;i++){
    //   switch (i) {
    //     case 0: date=this.state.date.slice(8,10);
    //     case value2:
    //       //Statements executed when the
    //       //result of expression matches value2

    //     case valueN:
    //       //Statements executed when the
    //       //result of expression matches valueN

    //     default:
    //       //Statements executed when none of
    //       //the values match the value of the expression

    //   }
    const getPrices = axios.get(
      "/api/price?date=" +
        this.state.date.slice(0, 16) +
        "&fromId=" +
        newFromId +
        "&toId=" +
        newToId
    );
    console.log("date format", this.state.date.slice(0, 16));

    const firstPrice = axios.get("/api/firstPrice");
    this.setState(
      {
        resultData: []
      },
      () => {
        Promise.all([getPrices, firstPrice]).then(([allRes, firstClass]) => {
          console.log(allRes.data.length);
          this.setState(
            {
              resultData: allRes.data,
              firstClass: firstClass.data
            },
            () => {
              this.props.resultListSetTrue();
            }
          );
        });
      }
    );
    //}
  };

  getStations = directions => {
    axios
      .post("/cities", { to: this.state.to, from: this.state.from })
      .then(response => {
        if (directions === "to") {
          let newDataTo = response.data.resultTo;
          if (this.state.to === "") newDataTo = [];
          this.setState({
            resultTo: newDataTo
          });
        } else {
          let newDataFrom = response.data.resultFrom;
          if (this.state.from === "") newDataFrom = [];
          this.setState({
            resultFrom: newDataFrom
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

  updateText = (text, id) => {
    this.setState({
      from: text,
      fromId: id,
      resultFrom: []
    });
  };

  updateTo = (text, id) => {
    this.setState({
      to: text,
      toId: id,
      resultTo: []
    });
  };

  handleClickSave = event => {
    axios
      .post("/api/journeys", {
        to: this.state.to,
        toId: this.state.toId,
        from: this.state.from,
        fromId: this.state.fromId,
        date: this.state.date.slice(0, 16)
      })
      .then(response => {
        this.setState({
          savedJourney: response.data
        });
        this.props.setFavorites(this.state.savedJourney);
        console.log("journey detail in searchform:", this.state.savedJourney);
      });
  };

  reverseDestinations = () => {
    this.setState({
      to: this.state.from,
      from: this.state.to,
      toId: this.state.fromId,
      fromId: this.state.toId
    });
  };

  render() {
    return (
      <div>
        <label htmlFor="From">From</label>
        <Autocomplete
          name="from"
          id="from"
          updateText={this.updateText}
          results={this.state.resultFrom}
          value={this.state.from}
          onChange={this.handleInputChange}
        />
        <label htmlFor="To">To</label>
        <button onClick={this.reverseDestinations}>-></button>
        <Autocomplete
          name="to"
          id={this.state.toId}
          updateText={this.updateTo}
          results={this.state.resultTo}
          value={this.state.to}
          onChange={this.handleInputChange}
        />
        <label htmlFor="Date">Date </label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={this.state.date}
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.handleSubmit}>
          Search
        </button>
        {this.props.isLoggedIn ? (
          <button onClick={this.handleClickSave}>
            Save this Trip to your List
          </button>
        ) : (
          <Link to="/Login">Login to save</Link>
        )}

        {this.props.resultListRender ? (
          <Results
            isLoggedIn={this.props.isLoggedIn}
            resultData={this.state.resultData}
            firstClass={this.state.firstClass}
          />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default SearchForm;
