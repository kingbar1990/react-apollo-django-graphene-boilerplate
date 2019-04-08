import React from "react";

import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";

import { withAuth } from "../../hocs/PrivateRoute";

import "../../index.css";

const Dashboard = props => {
  return (
    <div className="flexible-content">
      <SideBar />
      <div className="main-container">
        <NavBar handleLanguageChange={props.handleLanguageChange} />
        <main id="content" className="p-5">
          {props.children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
