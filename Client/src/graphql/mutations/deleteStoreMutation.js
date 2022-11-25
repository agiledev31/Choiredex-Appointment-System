import { gql } from "apollo-boost";

const deleteStoreMutation = gql`
  mutation($_id: ID) {
    deleteStore(_id: $_id) {
      _id
    }
  }
`;

export default deleteStoreMutation;
