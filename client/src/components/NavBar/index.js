import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
  MDBNavbarNav,
  NavbarNav,
  Collapse,
  NavItem,
  Fa
} from "mdbreact";
import Popover from "react-simple-popover";

import { DASHBOARD, PROFILE, TASKS } from "../../constants/routes";
export default class NavBar extends Component {
  state = {
    open: false,
    collapseID: ""
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  toggleCollapse = collapseID => () => {
    this.setState(state => {
      if (state.collapseID !== collapseID) {
        return { collapseID: collapseID };
      }
      return { collapseID: "" };
    });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  render() {
    return (
      <Navbar className="flexible-navbar" light expand="md" scrolling>
        <NavbarBrand href="/">Landing</NavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse13")} />
        <MDBCollapse id="navbarCollapse13" isOpen={this.state.collapseID} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to={DASHBOARD}>Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to={PROFILE}>Profile</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to={TASKS}>Tasks</MDBNavLink>
            </MDBNavItem>
            <NavbarNav>
              <NavItem>
                <a
                  rel="noopener noreferrer"
                  className="nav-link Ripple-parent"
                  href="https://www.rocklab.io"
                  target="_blank"
                >
                  About <b>RockLab company</b>
                </a>
              </NavItem>
            </NavbarNav>
          </MDBNavbarNav>
        </MDBCollapse>
        <Collapse navbar>
          <NavbarNav right>
            <NavItem>
              <a
                className="nav-link navbar-link"
                rel="noopener noreferrer"
                target="_blank"
                href="https://pl-pl.facebook.com/mdbootstrap/"
              >
                <Fa icon="facebook" />
              </a>
            </NavItem>
            <NavItem>
              <a
                className="nav-link navbar-link"
                rel="noopener noreferrer"
                target="_blank"
                href="https://twitter.com/mdbootstrap"
              >
                <Fa icon="twitter" />
              </a>
            </NavItem>
            <NavItem>
              <a
                className="border border-light rounded mr-1 nav-link Ripple-parent"
                rel="noopener noreferrer"
                href="https://github.com/mdbootstrap/React-Bootstrap-with-Material-Design"
                target="_blank"
              >
                <Fa icon="github" className="mr-2" />
                RockLab GitHub
              </a>
            </NavItem>
            <NavItem>
              <div
                style={{ display: "flex", cursor: "pointer" }}
                className="nav-link navbar-link"
                rel="noopener noreferrer"
              >
                <div className="button" ref="target" onClick={this.handleClick}>
                  <Fa icon="user" className="mr-2" />
                </div>
                <Popover
                  placement="bottom"
                  container={this}
                  target={this.refs.target}
                  show={this.state.open}
                  onHide={this.handleClose}
                >
                  <div className="popover-items">
                    <MDBNavLink to={TASKS}>Tasks</MDBNavLink>
                    <MDBNavLink to={PROFILE} onClick={this.handleLogout}>Log out</MDBNavLink>
                  </div>
                </Popover>
              </div>
            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}
