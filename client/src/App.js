import React from "react";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import UserPage from "./components/UserPage";
import Footer from "./components/Footer";

class App extends React.Component {
  state = {
    user: this.props.user,
    resultListRender: false,
    favorites: this.props.favorites || []
  };

  setUser = userObj => {
    this.setState({
      user: userObj
    });
  };

  resetTripResults = () => {
    this.setState({
      resultListRender: false
    });
  };

  resultListSetTrue = () => {
    this.setState({
      resultListRender: true
    });
  };

  setFavorites = fave => {
    this.setState({
      favorites: [...this.state.favorites, fave]
    });
    console.log("favorites in App working", this.state.favorites);
  };

  render() {
    return (
      <div className="App">
        <Navbar
          setUser={this.setUser}
          user={this.state.user}
          resetTripResults={this.resetTripResults}
        />
        <div>
          <Route
            path="/login"
            render={props => (
              <Login history={props.history} setUser={this.setUser} />
            )}
          />
        </div>

        <div>
          <Route
            path="/signup"
            render={props => (
              <Signup history={props.history} setUser={this.setUser} />
            )}
          />
        </div>

        <Route
          path="/user"
          render={props => (
            <UserPage
              history={props.history}
              setUser={this.setUser}
              favorites={this.state.favorites}
            />
          )}
        />
        <div className="HomeImage"></div>

        <Route
          exact
          path="/"
          render={props => (
            <SearchForm
              {...props}
              isLoggedIn={Boolean(this.state.user)}
              resultListSetTrue={this.resultListSetTrue}
              resultListRender={this.state.resultListRender}
              setFavorites={this.setFavorites}
            />
          )}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
