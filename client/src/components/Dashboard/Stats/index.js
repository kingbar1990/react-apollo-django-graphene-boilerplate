import React from 'react';
import {MDBCard, MDBCardTitle, MDBCardText, MDBContainer} from "mdbreact";
import {graphql, compose} from "react-apollo";
import {getTasks, getUsers} from "../../queries";
import {Pie} from "react-chartjs-2";


class Stat extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            type: this.props.type,
        }
    }

    componentDidMount() {
        this.setState({
            dataPie: {
                labels: ['In progress', 'Done', 'To Do'],
                datasets: [
                    {
                        data: [this.props.tasks.tasks && this.props.tasks.tasks.filter(task => task.status === 0),
                            this.props.tasks.tasks && this.props.tasks.tasks.filter(task => task.status === 1),
                            this.props.tasks.tasks && this.props.tasks.tasks.filter(task => task.status === 2)],
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
        })
    }


    render() {
        console.log(this.props)
        return (
            <MDBContainer>
                <MDBCard className="card-body"
                         style={{width: "22rem", marginTop: "1rem"}}>
                    <MDBCardTitle>{this.state.type}</MDBCardTitle>
                    <MDBCardText>
                        <Pie data={this.state.dataPie}
                             options={{responsive: true}}/>
                        {this.state.type === 'tasks' ? (
                            this.props.tasks.tasks && this.props.tasks.tasks.length
                        ) : (
                            this.props.users.users && this.props.users.users.length
                        )
                        }
                    </MDBCardText>
                </MDBCard>
            </MDBContainer>
        );
    }
}

export default compose(
    graphql(getUsers, {name: 'users'}),
    graphql(getTasks, {name: 'tasks'}),
)(Stat)
