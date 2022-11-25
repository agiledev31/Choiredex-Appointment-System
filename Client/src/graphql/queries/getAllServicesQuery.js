import { gql } from "apollo-boost";

const getAllServicesQuery = gql`
  {
    all_services {
      _id
      name
      description
      duration
    }
  }
`;

export default getAllServicesQuery;
