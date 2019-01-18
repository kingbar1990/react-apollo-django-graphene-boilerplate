import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Fa,
  MDBPopover,
  MDBIcon,
  MDBPopoverBody,
} from "mdbreact";

import { TOKEN } from "../../constants";

export default class TopNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
  }

  onClick = () => {
    this.setState({
      collapse: !this.state.collapse
    });
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
        <NavbarToggler onClick={this.onClick} />
        <Collapse isOpen={this.state.collapse} navbar>
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
                <MDBPopover placement="bottom" popoverBody={<Fa icon="user" className="mr-2" />}>
                  <MDBPopoverBody>
                    <div id="btn-logout" onClick={this.handleLogout}>
                      Log out
                    </div>
                  </MDBPopoverBody>
                </MDBPopover>
              </div>
            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}