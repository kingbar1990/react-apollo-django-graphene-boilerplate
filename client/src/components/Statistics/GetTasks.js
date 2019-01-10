import React from "react";
import { MDBCard, MDBCardText } from "mdbreact";
import { compose, graphql, Query } from "react-apollo";

import { Pie } from "react-chartjs-2";

import { getTasks } from "../../queries";

import Loader from "../Loader";

class GetTasks extends React.Component {
  render() {
    const stylesOnCard = { width: "22rem", marginTop: "1rem" };
    return (
      <Query query={getTasks}>
        {({ loading, error, data }) => {
          if (loading) return <Loader styles={stylesOnCard} />;
          if (error) return `Error! ${error.message}`;

          if (data.tasks.length) {
            return (
              <MDBCard className="card-body" style={stylesOnCard}>
                <h3>Tasks {data.tasks.length}</h3>
                <MDBCardText>
                  <Pie
                    data={{
                      labels: ["In progress", "Done", "To Do"],
                      datasets: [
                        {
                          data: [
                            data.tasks.filter(task => task.status === 0).length,
                            data.tasks.filter(task => task.status === 1).length,
                            data.tasks.filter(task => task.status === 2).length
                          ],
                          backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
                          hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
                        }
                      ]
                    }}
                    options={{ responsive: true }}
                  />
                </MDBCardText>
              </MDBCard>
            )
          }
          return (
            <MDBCard className="card-body" style={stylesOnCard}>
              <h3>Tasks: {data.tasks.length}</h3>
            </MDBCard>
          )
        }}
      </Query>
    );
  }
}

export default compose(
  graphql(getTasks, {
    name: "tasks",
    options: { fetchPolicy: "no-cache" }
  })
)(GetTasks);
