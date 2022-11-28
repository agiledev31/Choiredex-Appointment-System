import { gql } from "apollo-boost";

const getAppointmentQuery = gql`
  query getAppointmentQuery(
    $date: String
    $startTime: String
    $morningOrEvening: String
    $endTime: String
    $duration: Int
    $price: Int
    $firstName: String
    $lastName: String
    $email: String
    $phoneNumber: String
  ) {
    appointment(
      date: $date
      startTime: $startTime
      morningOrEvening: $morningOrEvening
      endTime: $endTime
      duration: $duration
      price: $price
      client: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phoneNumber: $phoneNumber
      }
    ) {
      date
      startTime
      morningOrEvening
      endTime
      duration
      price
      client {
        firstName
        lastName
        email
        phoneNumber
      }
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
      notes
      confirmed
    }
  }
`;

export default getAppointmentQuery;
