import React, { Component } from "react";

import TopNavigation from "../../components/TopNavigation";
import SideNavigation from "../../components/SideNavigation";
import Footer from "../../components/Footer";

import '../../index.css'

class Dashboard extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="flexible-content">
        <SideNavigation />
        <div className="main-container">
        <TopNavigation />
          <main id="content" className="p-5">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
