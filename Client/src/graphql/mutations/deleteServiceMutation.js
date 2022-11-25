import { gql } from "apollo-boost";

const deleteServiceMutation = gql`
  mutation($_id: ID) {
    deleteService(_id: $_id) {
      _id
    }
  }
`;

export default deleteServiceMutation;
