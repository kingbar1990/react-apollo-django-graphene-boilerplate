import React from 'react';
import { MDBCardTitle } from "mdbreact";

const Loader = ({ styles }) => (
    <MDBCardTitle style={styles}>
        <div className="loader" style={{ margin: "auto" }} />
    </MDBCardTitle>
)

export default Loader;