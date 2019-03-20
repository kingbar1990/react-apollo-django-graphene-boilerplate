import React from "react";

import { BACKEND_URL } from "../../../constants";

const UserImage = ({ path }) => (
  <img
    src={`${BACKEND_URL}/media/${path}`}
    alt="avatar"
    className="card-img-top"
  />
);

export default UserImage;
