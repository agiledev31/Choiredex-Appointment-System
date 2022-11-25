import { gql } from "apollo-boost";

const updateServiceMutation = gql`
  mutation(
    $_id: ID
    $name: String
    $description: String
  ) {
    updateService(
      _id: $_id
      name: $name
      description: $description
    ) {
      _id
      name
      description
    }
  }
`;

export default updateServiceMutation;
