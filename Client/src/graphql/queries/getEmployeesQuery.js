import { gql } from "apollo-boost";

const getEmployeesQuery = gql`
  {
    employees {
      firstName
      lastName
      email
      phoneNumber
      _id
      password
      permanentPasswordSet
      employeeRole
      profilePicture
      store {
        _id
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

export default getEmployeesQuery;
