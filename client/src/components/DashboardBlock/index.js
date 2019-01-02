import React from 'react';
import {MDBCard, MDBCardTitle, MDBCardText, MDBContainer} from "mdbreact";
import {compose, graphql} from "react-apollo/index";
import {getTasks, getUsers} from "../../queries";


class DashboardBlock extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            type: this.props.type,
        }
    }

    render() {
        console.log(this.props)
        return (
            <MDBContainer>
                <MDBCard className="card-body"
                         style={{width: "22rem", marginTop: "1rem"}}>
                    <MDBCardTitle>{this.state.type}</MDBCardTitle>
                    <MDBCardText>
                        {this.state.type === 'tasks' ? (
                            <h1>{this.props.data.tasks && this.props.data.tasks.length}</h1>
                        ) : (
                            <h1>this.props.data.tasks.length</h1>
                        )
                        }
                    </MDBCardText>
                </MDBCard>
            </MDBContainer>
        );
    }
}

export default compose(
    // graphql(getUsers, 'users'),
    graphql(getTasks, 'tasks'),
)(DashboardBlock)