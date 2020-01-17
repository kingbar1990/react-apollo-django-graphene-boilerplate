import React, { Fragment } from "react";

import GetTasks from "../../components/Statistics/GetTasks";
import GetUsers from "../../components/Statistics/GetUsers";
import GetProjects from "../../components/Statistics/GetProjects";

const Main = () => (
  <Fragment>
    <GetUsers />
    <GetTasks />
    <GetProjects />
  </Fragment>
);

export default Main;
