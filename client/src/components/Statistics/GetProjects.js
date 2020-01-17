import React from "react";

import { graphql, Query } from "react-apollo";
import { MDBCard, MDBCardText } from "mdbreact";
import { Pie } from "react-chartjs-2";

import i18n from "../../i18n";
import { getProjects } from "../../queries";

const GetProjects = () => {
  const stylesOnCard = { width: "22rem", marginTop: "1rem" };
  return (
    <Query query={getProjects} variables={{ page: 1 }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error! ${error.message}`;
        const projects = data.projects.objects;
        if (projects.length) {
          return (
            <MDBCard className="card-body" style={stylesOnCard}>
              <h3>
                {i18n.t("Projects")}: {projects.length}
              </h3>
              <MDBCardText>
                <Pie
                  data={{
                    datasets: [
                      {
                        data: [
                          projects.length
                        ],
                        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
                      }
                    ]
                  }}
                  options={{ responsive: true }}
                />
              </MDBCardText>
            </MDBCard>
          );
        }
        return (
          <MDBCard className="card-body" style={stylesOnCard}>
            <h3>
              {i18n.t("Projects")}: {projects.length}
            </h3>
          </MDBCard>
        );
      }}
    </Query>
  );
};

export default graphql(getProjects, { options: { fetchPolicy: "no-cache" } })(
  GetProjects
);
