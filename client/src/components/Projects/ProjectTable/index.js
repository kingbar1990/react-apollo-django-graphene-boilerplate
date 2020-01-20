import React, { Fragment } from "react";
import ReactTable from "react-table";
import { Query } from "react-apollo";
import { getProjects } from "../../../queries";
import { TASKS } from "../../../constants/routes"
import i18n from "../../../i18n";
import IosRemoveCircleOutline from "react-ionicons/lib/IosRemoveCircleOutline";
import IosCreateOutline from "react-ionicons/lib/IosCreateOutline";
import Pagination from "./PaginateTable";

const ProjectTable = ({ modal, page, fetchData }) => {
  const columns = [
    {
      Header: i18n.t("General"),
      columns: [
        {
          Header: i18n.t("Title"),
          accessor: "name"
        },
        {
          Header: i18n.t("Description"),
          accessor: "description"
        }
      ]
    },
    {
      Header: i18n.t("Info"),
      columns: [
        {
          Header: i18n.t("Tasks"),
          Cell:  row => <a href={TASKS}> {row.original.tasks.reduce(function(str, current){if (typeof(str) !== "string") {str = `#${str.id}`} return str + "," + " #" + current.id})} </a>
        },
        {
          Header: i18n.t("Budget"),
          accessor: "budget"
        },
        {
          Header: i18n.t("Deadline"),
          accessor: "deadline"
        }
      ]
    },
    {
      Header: i18n.t("Responsibility"),
      columns: [
        {
          Header: i18n.t("Developer"),
          Cell: row => row.original.developer.fullName
        }
      ]
    },
    {
      Header: i18n.t("Actions"),
      Cell: row => (
        <div>
          <IosCreateOutline
            onClick={() => modal("modalEdit", row.original)}
            fontSize="30px"
            color="#007bff"
          />
          <IosRemoveCircleOutline
            onClick={() => modal("modalDelete", row.original)}
            fontSize="30px"
            color="#007bff"
          />
        </div>
      )
    }
  ];
  return (
    <Query
      query={getProjects}
      variables={{ page: page }}
      notifyOnNetworkStatusChange
      fetchPolicy="cache-and-network"
    >
      {({ data, loading }) => {
        if (loading) return null;
        const { objects, page, pages } = data.projects;
        return (
          <Fragment>
            <ReactTable
              columns={columns}
              data={objects}
              showPagination={false}
              showPageJump={false}
              showPageSizeOptions={false}
              defaultPageSize={10}
              className="-striped -highlight table"
            />
            <Pagination fetchData={fetchData} page={page} pages={pages} />
          </Fragment>
        );
      }}
    </Query>
  );
};

export default ProjectTable;
