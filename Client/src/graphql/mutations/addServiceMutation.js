import { gql } from "apollo-boost";

const addServiceMutation = gql`
  mutation(
    $name: String!
    $description: String!
    $duration: Int!
  ) {
    addService(
      name: $name
      description: $description
      duration: $duration
    ) {
      name
      description
      duration
    }
  }
`;

export default addServiceMutation;
