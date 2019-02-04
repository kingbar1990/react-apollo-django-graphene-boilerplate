import React from "react";
import { MDBCard, MDBCardText } from "mdbreact";
import { graphql, Query } from "react-apollo";

import { getTasks } from "../../queries";

import { Pie } from "react-chartjs-2";
class GetTasks extends React.Component {
  render() {
    const stylesOnCard = { width: "22rem", marginTop: "1rem" };
    return (
      <Query query={getTasks} variables={{ page: 1 }}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error! ${error.message}`
          const tasks = data.tasks.objects;
          if (tasks.length) {
            return (
              <MDBCard className="card-body" style={stylesOnCard}>
                <h3>Tasks: {tasks.length}</h3>
                <MDBCardText>
                  <Pie
                    data={{
                      labels: ["In progress", "Done", "To Do"],
                      datasets: [
                        {
                          data: [
                            tasks.filter(task => task.status === 0).length,
                            tasks.filter(task => task.status === 1).length,
                            tasks.filter(task => task.status === 2).length
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
              <h3>Tasks: {tasks.length}</h3>
            </MDBCard>
          )
        }}
      </Query>
    );
  }
}

export default graphql(getTasks, {options: { fetchPolicy: "no-cache" }})(GetTasks);
