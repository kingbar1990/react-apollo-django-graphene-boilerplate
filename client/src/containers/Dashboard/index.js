import React, { Component } from "react";

import TopNavigation from "../../components/TopNavigation";
import SideNavigation from "../../components/SideNavigation";
import Footer from "../../components/Footer";


class Dashboard extends Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div className="flexible-content">
        <TopNavigation />
        <SideNavigation />
        <main id="content" className="p-5">
          {children}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
