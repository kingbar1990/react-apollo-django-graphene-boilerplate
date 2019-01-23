import React from "react";
import { Query } from "react-apollo";

import Select from "./Select";
import Users from "./Users";

import { getUsers } from "../../../queries";

const GetUsers = ({ assignedTo, user }) => (
  <Query query={getUsers}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>{`Error! ${error.message}`}</p>;
      if (user) {
        return (
          <Select>
            <option key={assignedTo.id} value={assignedTo.id}>
              {assignedTo.fullName}
            </option>
            {data.users.map(user => {
              if (user.fullName !== assignedTo.fullName)
                return (
                  <option key={user.id} value={user.id}>
                    {user.fullName}
                  </option>
                );
              return <div />;
            })}
          </Select>
        );
      }
      return (
        <Select>
          <Users userData={data} />
        </Select>
      );
    }}
  </Query>
);

export default GetUsers;
