import React, { Fragment } from "react";

import GetTasks from "../../components/Statistics/GetTasks";
import GetUsers from "../../components/Statistics/GetUsers";

const Main = () => (
  <Fragment>
    <GetUsers />
    <GetTasks />
  </Fragment>
);

export default Main;
