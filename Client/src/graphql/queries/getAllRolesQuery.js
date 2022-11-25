import { gql } from "apollo-boost";

const getAllRolesQuery = gql`
  {
    all_roles {
      _id
      name
      description
    }
  }
`;

export default getAllRolesQuery;
