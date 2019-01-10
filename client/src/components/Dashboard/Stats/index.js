import React from "react";
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";
import { graphql, compose } from "react-apollo";
import { getTasks, getUsers } from "../../../queries";
import { Pie } from "react-chartjs-2";

class Stat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type
    };
  }

  render() {
    const stylesOnCard = { width: "22rem", marginTop: "1rem" };
    if (this.props.tasks.loading) {
      return (
        <MDBContainer>
          <MDBCardTitle style={stylesOnCard}>
            <div className="loader" style={{ margin: 'auto' }} />
          </MDBCardTitle>
        </MDBContainer>
      )
    }
    const { users } = this.props.users;
    const { tasks } = this.props.tasks;
    const dataPie = {
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
    };
    const { type } = this.state;
    
    return (
      <MDBContainer>
        <MDBCard className="card-body" style={stylesOnCard}>
          <h3>Users: {users.length}</h3>
        </MDBCard>
        <MDBCard className="card-body" style={stylesOnCard}>
        <h3>{type}</h3>
          <MDBCardText>
            {type === "Tasks"
              ? tasks.length && (
                  <Pie data={dataPie} options={{ responsive: true }} />
                )
              : users.length}
          </MDBCardText>
        </MDBCard>
      </MDBContainer>
    );
  }
}

export default compose(
  graphql(getUsers, { name: "users" }),
  graphql(getTasks, {
    options: { fetchPolicy: "no-cache" },
    name: "tasks"
  })
)(Stat);
