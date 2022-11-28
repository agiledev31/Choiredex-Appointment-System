import { gql } from "apollo-boost";

const updateStoreMutation = gql`
  mutation(
    $_id: ID
    $name: String
    $address: String
    $coordinateLat: String
    $coordinateLng: String
    $city: String
    $country: String
    $phone: String
    $email: String
    $website: String
    $timezone: String
    $availableServices: [String]
  ) {
    updateStore(
      _id: $_id
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

export default updateStoreMutation;
