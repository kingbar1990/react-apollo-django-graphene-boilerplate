import gql from "graphql-tag";

export const register = gql `
  mutation register(
    $email: String!
    $password1: String!
    $password2: String!
    $fullName: String!
  ) {
    register(
      email: $email
      password1: $password1
      password2: $password2
      fullName: $fullName
    ) {
      error {
        __typename
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
      success
      token
      user {
        id
        email
        fullName
      }
    }
  }
`;

export const login = gql `
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      error {
        __typename
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
      token
      user {
        id
        email
        fullName
      }
    }
  }
`;

export const editUser = gql `
  mutation editUser(
    $fullName: String
    $email: String!
    $avatar: String
  ) {
    editUser(fullName: $fullName, email: $email, avatar: $avatar) {
      error {
        __typename
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
      user {
        id
        fullName
        email
        avatar
      }
    }
  }
`;

export const verifyToken = gql `
  mutation verifyToken($token: String!) {
    verifyToken(token: $token) {
      payload
    }
  }
`;

export const getUsers = gql `
  query getUsers {
    users {
      id
      fullName
      email
    }
  }
`;

export const getTasks = gql `
  query getTasks($page: Int) {
    tasks(page: $page) {
      page
      pages
      hasNext
      hasPrev
      objects {
        id
        name
        description
        status
        dueDate
        estimatedTime
        assignedTo {
          id
          email
          fullName
        }
        project {
          id
          name
        }
      }
    }
  }
`;

export const createTask = gql `
  mutation createTask(
    $taskId: Int!
    $name: String!
    $description: String
    $status: String!
    $dueDate: Date
    $assignedTo: ID
    $estimatedTime: Int!
    $project: ID
  ) {
    createTask(taskId: $taskId, project: $project, name: $name, description: $description, status: $status, dueDate: $dueDate,  estimatedTime: $estimatedTime, assignedTo: $assignedTo) {
      error {
        __typename
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
      task {
        id
        name
        description
        status
        dueDate
        estimatedTime
        assignedTo {
          id
        }
        project {
          id
        }
      }
    }
  }
`;

export const updateTask = gql `
  mutation updateTask(
    $taskId: Int!
    $name: String!
    $description: String
    $status: String!
    $dueDate: Date
    $assignedTo: ID
    $estimatedTime: Int!
    $project: ID
  ) {
    updateTask(taskId: $taskId, project: $project, name: $name, description: $description, status: $status, dueDate: $dueDate,  estimatedTime: $estimatedTime, assignedTo: $assignedTo) {
      error {
        __typename
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
      task {
        id
        name
        description
        status
        dueDate
        estimatedTime
        assignedTo {
          id
        }
        project {
          id
        }
      }
    }
  }
`;

export const deleteTask = gql `
  mutation deleteTask($taskId: String) {
    deleteTask(taskId: $taskId) {
      success
    }
  }
`;

export const User = gql `
  query me {
    me {
      id
      email
      fullName
      avatar
    }
  }
`;

export const confirmEmail = gql `
  mutation confirmEmail($email: String!) {
    confirmEmail(email:$email){
      success
      error {
        __typename
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
    }
  }
`;

export const resetPassword = gql `
  mutation resetPassword($newPassword1: String!, $newPassword2: String!, $confirmToken: String!, $userId: Int!) {
    resetPassword(newPassword1: $newPassword1, newPassword2: $newPassword2, confirmToken: $confirmToken, userId: $userId){
      success
      error {
        __typename
        ... on ValidationErrors {
          validationErrors {
            field
            messages
          }
        }
      }
    }
  }
`;

export const createProject = gql `
  mutation createProject(
    $name: String!
    $description: String
    $budget: Int!
    $deadline: Date 
    $developer: ID!
    $projectId: Int
    $tasks: String
  ) {
    createProject(name: $name, deadline: $deadline, description: $description, tasks: $tasks, projectId: $projectId, budget: $budget, developer: $developer){
      error{
        __typename
        ... on ValidationErrors{
          validationErrors{
            field
            messages
          }
        }
      }
      project{
        id
        name
        description
        budget
        deadline
        developer {
          id
        }
      }
    }
  }
`;

export const updateProject = gql `
  mutation updateProject (
    $projectId: Int!
    $name: String!
    $deadline: Date
    $description: String
    $budget: Int!
    $developer: ID!
    $tasks: String
  )
  {
    updateProject(projectId: $projectId, name: $name, description: $description, deadline: $deadline, tasks: $tasks, budget: $budget, developer: $developer){
      error{
        __typename
        ... on ValidationErrors{
          validationErrors{
            field
            messages
          }
        }
      }
      project{
        id
        name
        description
        budget
        deadline
        developer{
          id
        }
      }
    }
  }
`;

export const deleteProject = gql `
  mutation deleteProject($projectId: String){
    deleteProject(projectId: $projectId){
      success
    }
  }
`;

export const getProjects = gql `
  query getProjects($page: Int){
    projects(page: $page){
      page
      pages
      hasNext
      hasPrev
      objects{
        id
        name
        description
        budget
        deadline
        developer {
          id
          email
          fullName
        }
        tasks{
          id
          name
        }
      }
    }
  }
`;

export const getAllProjects = gql `
  query getAllProjects{
    allProjects{
        id
        name
        description
        budget
        deadline
        developer {
          id
          email
          fullName
        }
    }
  }
`

export const getAllTasks = gql `
  query getAllTasks{
    allTasks{
      id
        name
        description
        status
        dueDate
        estimatedTime
        assignedTo {
          id
        }
        project {
          id
        }
    }
  }
`