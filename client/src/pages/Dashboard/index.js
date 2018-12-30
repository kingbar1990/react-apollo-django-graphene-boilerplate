import React, { Component } from "react";
import TopNavigation from "../../components/TopNavigation";
import SideNavigation from "../../components/SideNavigation";
import Footer from "../../components/Footer";
import Content from "../../containers/DashboardContent";


class Dashboard extends Component {
  render() {
    return (
      <div className="flexible-content">
        <TopNavigation />
        <SideNavigation />
        <main id="content" className="p-5">
          <Content />
        </main>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;
