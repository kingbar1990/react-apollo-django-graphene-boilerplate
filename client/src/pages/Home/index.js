import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./scss/App.css";
import "./scss/index.css";


class Home extends Component {
  render() {
    return (
      <div className="App">
        Home Page
        <p><Link to="/login/">login</Link></p>
        <p><Link to="/signup/">signup</Link></p>
        <p><Link to="/dashboard/">dashboard</Link></p>
      </div>
    );
  }
}

export default Home;
