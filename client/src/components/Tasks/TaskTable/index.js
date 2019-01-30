import React, { Component } from "react";
import ReactTable from "react-table";
import IosRemoveCircleOutline from "react-ionicons/lib/IosRemoveCircleOutline";
import IosCreateOutline from "react-ionicons/lib/IosCreateOutline";

import Loader from "../../Loader";
import TableHeader from "./TableHeader";

import "./style.css";

export default class TaskTabe extends Component {
  render() {
    if (this.props.tasks.loading) {
      return <Loader />;
    }
    return (
      <>
        <TableHeader
          title="Task List"
          modalCreate={() => this.props.modalCreate("modalCreate")}
        />
        <ReactTable
          data={this.props.tasks}
          columns={[
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
                    onClick={() =>
                      this.props.modal("modalDelete", row.original)
                    }
                    fontSize="30px"
                    color="#007bff"
                  />
                </div>
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight table"
        />
      </>
    );
  }
}
