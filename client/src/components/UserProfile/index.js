import React, { lazy, Suspense } from "react";

import i18n from "../../i18n";
import withoutAvatar from "../../assets/user.png";
import Loader from "../Loader";

const UserImage = lazy(() => import("./UserImage"));

const UserInfo = ({ profile }) => (
  <div className="col-lg-3 col-xlg-3 col-md-5">
    <div className="card">
      <div className="card-body">
        <center className="m-t-30">
          {profile.avatar ? (
            <Suspense fallback={<Loader />}>
              <UserImage path={profile.avatar} />
            </Suspense>
          ) : (
            <img src={withoutAvatar} alt="" className="card-img-top" />
          )}
          <h4 className="card-title m-t-10">{profile.firstName}</h4>
        </center>
      </div>
      <div>
        <hr />
      </div>
      <div className="card-body">
        <small className="text-muted">{i18n.t("Email address")} </small>
        <h6>{profile.email}</h6>
      </div>
    </div>
  </div>
);

export default UserInfo;
