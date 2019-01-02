import React from "react";
import ReactTable from 'react-table'
import "react-table/react-table.css";


class Content extends React.Component {
  render() {
    return (
      <div>
        <ReactTable
          //data={data}
          columns={[
            {
              Header: "General",
              columns: [
                {
                  Header: "Title",
                  accessor: "title"
                },
                {
                  Header: "Description",
                  id: "description"
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
              Header: 'Responsibility',
              columns: [
                {
                  Header: "Assigned to",
                  accessor: "assignedTo"
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}

export default Content
