import React, { Component } from "react";
import ResultList from "./ResultList";

export default class Results extends Component {
  state = {
    results: [],
    number: 20,
    redPrice: ""
  };

  loadNext = () => {
    this.setState({
      number: this.state.number + 20
    });
  };

  componentDidMount() {
    const mapped = this.props.resultData.map((journey, i) => {
      const obj = {};
      obj.origin = journey.origin;
      obj.destination = journey.destination;
      obj.normalPrice = journey.price.amount;
      obj.firstClass = this.props.firstClass[i]?.price.amount;
      obj.legs = journey.legs;
      obj.id = journey.id;
      return obj;
    });

    const sorted = [...mapped].sort((a, b) => {
      return a.legs[0].departure.localeCompare(b.legs[0].departure);
    });
    let arr = [];
    for (let i = 0; i < sorted.length; i++) {
      arr.push(sorted[i].normalPrice);
    }
    let minPrice = Math.min.apply(null, arr);

    this.setState({
      results: sorted,
      redPrice: minPrice
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      const mapped = this.props.resultData.map((journey, i) => {
        const obj = {};
        obj.origin = journey.origin;
        obj.destination = journey.destination;
        obj.normalPrice = journey.price.amount;
        obj.firstClass = this.props.firstClass[i]?.price.amount;
        obj.legs = journey.legs;
        obj.id = journey.id;
        return obj;
      });
      const sorted = [...mapped].sort((a, b) => {
        return a.legs[0].departure.localeCompare(b.legs[0].departure);
      });

      this.setState({
        results: sorted
      });
    }
  }

  sortByPrice = () => {
    const priced = [...this.state.results].sort((a, b) => {
      return a.normalPrice - b.normalPrice;
    });
    this.setState({
      results: priced
    });
  };

  sortByTime = () => {
    const timed = [...this.state.results].sort((a, b) => {
      return a.legs[0].departure.localeCompare(b.legs[0].departure);
    });
    this.setState({
      results: timed
    });
  };

  render() {
    return (
      <div className="ResultsPage">
        <div className="Filter">
          <button onClick={this.sortByPrice}>Sort by Price</button>
          <button onClick={this.sortByTime}>Sort by Time</button>
        </div>
        {this.state.results.slice(0, this.state.number).map(el => (
          <ResultList detail={el} key={el.id} redPrice={this.state.redPrice} />
        ))}
        <button className="LoadMoreBtn" onClick={this.loadNext}>
          Load More
        </button>
      </div>
    );
  }
}
