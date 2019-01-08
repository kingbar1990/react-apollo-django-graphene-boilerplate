export const tasksColumns = [
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
          accessor: "assignedTo"
        }
      ]
    }
  ]