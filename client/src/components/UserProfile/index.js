import React from "react";
import { BACKEND_URL } from "../../constants";

const UserInfo = ({ profile }) => {
  return (
    <div className="col-lg-3 col-xlg-3 col-md-5">
      <div className="card">
        <div className="card-body">
          <center className="m-t-30">
            <img
              src={`${BACKEND_URL}/media/${profile.avatar}`}
              alt="avatar"
              className="card-img-top"
            />
            <h4 className="card-title m-t-10">{profile.fullName}</h4>
          </center>
        </div>
        <div>
          <hr />
        </div>
        <div className="card-body">
          <small className="text-muted">Email address </small>
          <h6>{profile.email}</h6>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
