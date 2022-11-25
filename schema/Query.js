const graphql = require("graphql");
const appointmentQuery = require("./queries/appointmentQuery");
const clientQuery = require("./queries/clientQuery");
const employeeQuery = require("./queries/employeeQuery");
const loginQuery = require("./queries/loginQuery");
const adminLoginQuery = require("./queries/adminLoginQuery");
const allPersonalEventsQuery = require("./queries/allPersonalEventsQuery");
const allAppointmentsQuery = require("./queries/allAppointmentsQuery");
const ownAppointmentsQuery = require("./queries/ownAppointmentsQuery");
const ownPastAppointmentsQuery = require("./queries/ownPastAppointmentsQuery");
const clientsQuery = require("./queries/clientsQuery");
const employeesQuery = require("./queries/employeesQuery");
const allRolesQuery = require("./queries/allRolesQuery");
const allServicesQuery = require("./queries/allServicesQuery");
const allStoresQuery = require("./queries/allStoresQuery");

const { GraphQLObjectType } = graphql;

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    appointment: appointmentQuery,
    client: clientQuery,
    employee: employeeQuery,
    login: loginQuery,
    adminLogin: adminLoginQuery,
    all_personal_events: allPersonalEventsQuery,
    all_appointments: allAppointmentsQuery,
    own_appointments: ownAppointmentsQuery,
    own_past_appointments: ownPastAppointmentsQuery,
    clients: clientsQuery,
    employees: employeesQuery,
    all_roles: allRolesQuery,
    all_services: allServicesQuery,
    all_stores: allStoresQuery,
  },
});

module.exports = Query;
