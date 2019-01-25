import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  Collapse,
  NavItem,
  NavLink,
  Fa
} from "mdbreact";
import Popover from "react-simple-popover";

import { TOKEN } from "../../constants";
export default class NavBar extends Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogout = () => {
    localStorage.removeItem(TOKEN);
    window.location.href = "/login";
  };

  render() {
    return (
      <Navbar className="flexible-navbar" light expand="md" scrolling>
        <NavbarBrand href="/">
          <strong>Landing</strong>
        </NavbarBrand>
        <Collapse navbar>
          <NavbarNav left>
            <NavItem active>
              <NavLink to="#">Home</NavLink>
            </NavItem>
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
                    <div>
                      <Link to="/dashboard/profile" onClick={this.handleLogout}>Log out</Link>
                    </div>
                    <div>
                      <Link to="/dashboard/profile" >Profile</Link>
                    </div>
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
