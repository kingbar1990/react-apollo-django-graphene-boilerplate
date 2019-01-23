import React from "react";

const User = ({ userData }) =>
  userData.users.map(user => (
    <option key={user.id} value={user.id}>
      {user.fullName}
    </option>
  ));

export default User;
