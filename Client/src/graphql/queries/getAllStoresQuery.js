import { gql } from "apollo-boost";

const getAllStoresQuery = gql`
  {
    all_stores {
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
`;

export default getAllStoresQuery;
