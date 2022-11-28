import { gql } from "apollo-boost";

const addStoreMutation = gql`
  mutation(
    $name: String!
    $address: String!
    $coordinateLat: String!
    $coordinateLng: String!
    $city: String!
    $country: String!
    $phone: String!
    $email: String!
    $website: String!
    $timezone: String!
    $availableServices: [String]
  ) {
    addStore(
      name: $name
      address: $address
      coordinateLat: $coordinateLat
      coordinateLng: $coordinateLng
      city: $city
      country: $country
      phone: $phone
      email: $email
      website: $website
      timezone: $timezone
      availableServices: $availableServices
    ) {
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

export default addStoreMutation;
