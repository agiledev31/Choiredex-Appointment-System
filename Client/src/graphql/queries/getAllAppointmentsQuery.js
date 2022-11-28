import { gql } from "apollo-boost";

const getAllAppointmentsQuery = gql`
  {
    all_appointments {
      id
      date
      startTime
      morningOrEvening
      endTime
      duration
      price
      esthetician
      client {
        _id
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

export default getAllAppointmentsQuery;
