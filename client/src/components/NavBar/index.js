import React, { useState, useEffect, useCallback } from "react";
import {
  Navbar,
  NavbarBrand,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
  MDBNavbarNav,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  NavbarNav,
  Collapse,
  NavItem,
  Fa
} from "mdbreact";
import Links from "./Links";

import i18n from "../../i18n";

import { DASHBOARD, PROFILE, TASKS } from "../../constants/routes";

export default props => {
  const [collapse, handleClick] = useState("");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const toggleCollapse = useCallback(collapseID => () =>
    handleClick((!collapse && collapseID) || "")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Navbar className="flexible-navbar" light expand="md" scrolling>
      <NavbarBrand href="/">{i18n.t("Landing")}</NavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse("navbarCollapse13")} />
      <MDBCollapse id="navbarCollapse13" isOpen={collapse} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink to={DASHBOARD}>{i18n.t("Home")}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to={PROFILE}>{i18n.t("Profile")}</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to={TASKS}>{i18n.t("Tasks")}</MDBNavLink>
          </MDBNavItem>
          <NavbarNav>
            <NavItem>
              <a
                rel="noopener noreferrer"
                className="nav-link Ripple-parent"
                href="https://www.rocklab.io"
                target="_blank"
              >
                {i18n.t("About")} <b>RockLab company</b>
              </a>
            </NavItem>
          </NavbarNav>
          {width <= 768 ? <Links handleLogout={handleLogout} /> : ""}
        </MDBNavbarNav>
      </MDBCollapse>
      <Collapse navbar>
        <NavbarNav right>
          <NavItem>
            <select
              className="browser-default custom-select"
              onChange={props.handleLanguageChange}
            >
              <option value="en">EN</option>
              <option value="ru">RU</option>
            </select>
          </NavItem>
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
          <MDBDropdown>
            <MDBDropdownToggle nav>
              <Fa icon="user" className="mr-2" style={{ color: "#000" }} />
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-default" right>
              <MDBNavLink to="#" onClick={handleLogout}>
                Logout
              </MDBNavLink>
            </MDBDropdownMenu>
          </MDBDropdown>
        </NavbarNav>
      </Collapse>
    </Navbar>
  );
};
