import React from 'react';
import {MDBCard, MDBCardTitle, MDBCardText, MDBContainer} from "mdbreact";
import {graphql, compose} from "react-apollo";
import {getTasks, getUsers} from "../../../queries";
import {Pie} from "react-chartjs-2";


class Stat extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            type: this.props.type,
        }
    }

    render() {

        if (this.props.tasks.loading) {
            return <div className="loader"></div>
        }
        let {tasks} = this.props.tasks
        let {users} = this.props.users

        let dataPie = {
            labels: ['In progress', 'Done', 'To Do'],
            datasets: [
                {
                    data: [tasks.filter(task => task.status === 0).length,
                        tasks.filter(task => task.status === 1).length,
                        tasks.filter(task => task.status === 2).length],
                    backgroundColor: [
                        "#F7464A",
                        "#46BFBD",
                        "#FDB45C",
                    ],
                    hoverBackgroundColor: [
                        "#FF5A5E",
                        "#5AD3D1",
                        "#FFC870",
                    ]
                }
            ]
        }

        return (
            <MDBContainer>
                <MDBCard className="card-body"
                         style={{width: "22rem", marginTop: "1rem"}}>
                    <MDBCardTitle>{this.state.type}</MDBCardTitle>
                    <MDBCardText>
                        {this.state.type === 'tasks' ? (tasks.length) &&
                            <Pie data={dataPie} options={{responsive: true}}/>
                            : (users.length)
                        }
                    </MDBCardText>
                </MDBCard>
            </MDBContainer>
        );
    }
}

export default compose(
    graphql(getUsers, {name: 'users'}),
    graphql(getTasks, {
        options: {fetchPolicy: 'no-cache'},
        name: 'tasks',
    }),
)(Stat)
