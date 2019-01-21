import React, { Component } from "react";
import { ListGroup, ListGroupItem, Fa } from "mdbreact";
import { NavLink } from "react-router-dom";

import logo from "../../assets/logo.svg";

export default class TopNavigation extends Component {
  render() {
    return (
      <div className="sidebar-fixed position-fixed">
        <a href="#!" className="logo-wrapper waves-effect">
          <img alt="MDB React Logo" className="img-fluid" src={logo}/>
        </a>
        <ListGroup className="list-group-flush">
          <NavLink exact={true} to="/dashboard" activeClassName="activeClass">
            <ListGroupItem>
              <Fa icon="pie-chart" className="mr-3"/>
              Dashboard
            </ListGroupItem>
          </NavLink>
          <NavLink to="/dashboard/profile" activeClassName="activeClass">
            <ListGroupItem>
              <Fa icon="user" className="mr-3"/>
              Profile
            </ListGroupItem>
          </NavLink>
          <NavLink to="/dashboard/tasks" activeClassName="activeClass">
            <ListGroupItem>
              <Fa icon="table" className="mr-3"/>
              Tasks
            </ListGroupItem>
          </NavLink>
        </ListGroup>
      </div>
    );
  }
}
