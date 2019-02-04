import React from "react";

import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";

import { withAuth } from '../../hocs/PrivateRoute';

import "../../index.css";

const Dashboard = ({ children }) => (
  <div className="flexible-content">
    <SideBar />
    <div className="main-container">
      <NavBar />
      <main id="content" className="p-5">
        {children}
      </main>
      <Footer />
    </div>
  </div>
);

export default withAuth(Dashboard);
