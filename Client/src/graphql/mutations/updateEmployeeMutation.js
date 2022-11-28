import { gql } from "apollo-boost";

gql`
  input StoreType {
    _id: String!
    name:  String!
    address:  String!
    coordinateLat: Int!
    coordinateLng: Int!
    city:  String!
    country:  String!
    phone:  String!
    email:  String!
    website:  String!
    timezone:  String!
    availableServices: Array
  }
`;

gql`
  input StoreInput {
    store: [StoreType]
  }
`;

const updateEmployeeMutation = gql`
  mutation(
    $_id: ID
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
    $employeeRole: [String]
    $store: [StoreInput]
  ) {
    updateEmployee(
        _id: $_id
        firstName: $firstName
        lastName: $lastName
        email: $email
        phoneNumber: $phoneNumber
        employeeRole: $employeeRole
        store: $store
    ) {
        _id
        firstName
        lastName
        email
        phoneNumber
        employeeRole
        store {
            name
            address
            coordinateLat
            coordinateLng
            city
            country
            phone
            email
            website
            timezone
            availableServices
          }
    }
  }
`;

export default updateEmployeeMutation;
