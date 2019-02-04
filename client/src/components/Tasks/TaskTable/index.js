import React, { Component, Fragment } from "react";
import ReactTable from "react-table";
import { Query } from "react-apollo";
import { getTasks } from "../../../queries";

import IosRemoveCircleOutline from "react-ionicons/lib/IosRemoveCircleOutline";
import IosCreateOutline from "react-ionicons/lib/IosCreateOutline";
import Pagination from "./PaginateTable";

export default class TaskTable extends Component {
  render() {
    const columns = [
      {
        Header: "General",
        columns: [
          {
            Header: "Title",
            accessor: "name"
          },
          {
            Header: "Description",
            accessor: "description"
          }
        ]
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Status",
            accessor: "status"
          },
          {
            Header: "Due date",
            accessor: "dueDate"
          },
          {
            Header: "Estimated time",
            accessor: "estimatedTime"
          }
        ]
      },
      {
        Header: "Responsibility",
        columns: [
          {
            Header: "Assigned to",
            Cell: row => row.original.assignedTo.fullName
          }
        ]
      },
      {
        Header: "Actions",
        Cell: row => (
          <div>
            <IosCreateOutline
              onClick={() => this.props.modal("modalEdit", row.original)}
              fontSize="30px"
              color="#007bff"
            />
            <IosRemoveCircleOutline
              onClick={() => this.props.modal("modalDelete", row.original)}
              fontSize="30px"
              color="#007bff"
            />
          </div>
        )
      }
    ];
    return (
      <Query
        query={getTasks}
        variables={{ page: this.props.page }}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
      >
        {({ data, loading }) => {
          if (loading) return null;
          const { objects, page, pages } = data.tasks;
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
              <Pagination
                fetchData={this.props.fetchData}
                page={page}
                pages={pages}
              />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}
