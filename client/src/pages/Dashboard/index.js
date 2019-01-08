import React from "react";
import "react-table/react-table.css";

import Dashboard from "../../containers/Dashboard";
import Stat from "../../components/Dashboard/Stats";
import { getTasks, getUsers } from "../../queries";
import { compose, graphql } from "react-apollo/index";

class Main extends React.Component {
  render() {
    if (this.props.tasks.loading) {
      return <div />;
    }
    return (
      <Dashboard>
        <React.Fragment>
          <Stat
            type={"Tasks"}
            users={this.props.users}
            tasks={this.props.tasks}
          />
        </React.Fragment>
      </Dashboard>
    );
  }
}

export default compose(
  graphql(getUsers, { name: "users" }),
  graphql(getTasks, {
    options: { fetchPolicy: "no-cache" },
    name: "tasks"
  })
)(Main);
