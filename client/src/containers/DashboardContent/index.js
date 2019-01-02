import React from "react";
import DashboardBlock from "../../components/DashboardBlock";


class Content extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DashboardBlock type={'users'} />
        <DashboardBlock type={'tasks'} />
      </React.Fragment>
    )
  }
}

export default Content;
