import React, { Fragment } from "react";

import { Fa } from "mdbreact";

const Links = ({ handleLogout }) => (
  <Fragment>
    <li className="nav-item">
      <a className="nav-link" href="/login" onClick={handleLogout}>
        Logout
      </a>
    </li>
    <li className="nav-item">
      <a
        className="nav-link navbar-link"
        rel="noopener noreferrer"
        target="_blank"
        href="https://pl-pl.facebook.com/mdbootstrap/"
      >
        <Fa icon="facebook" />
      </a>
      <a
        className="nav-link navbar-link"
        rel="noopener noreferrer"
        target="_blank"
        href="https://twitter.com/mdbootstrap"
      >
        <Fa icon="twitter" />
      </a>
      <a
        className="border border-light rounded mr-1 nav-link Ripple-parent"
        rel="noopener noreferrer"
        href="https://github.com/mdbootstrap/React-Bootstrap-with-Material-Design"
        target="_blank"
      >
        <Fa icon="github" className="mr-2" />
        RockLab GitHub
      </a>
    </li>
  </Fragment>
);

export default Links;
