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
        <div className="m-5">
          <main id="content" className="p-2 card">
            {props.children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
