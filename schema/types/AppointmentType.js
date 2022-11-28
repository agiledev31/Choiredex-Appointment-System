const graphql = require("graphql");
const ClientType = require("./ClientType");
const StoreType = require("./StoreType");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const AppointmentType = new GraphQLObjectType({
  name: "AppointmentType",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    date: { type: GraphQLString },
    startTime: { type: GraphQLString },
    morningOrEvening: { type: GraphQLString },
    endTime: { type: GraphQLString },
    duration: { type: GraphQLInt },
    price: { type: GraphQLInt },
    esthetician: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    client: { type: ClientType },
    store: { type: StoreType },
    notes: { type: GraphQLString },
    confirmed: { type: GraphQLBoolean },
  }),
});

module.exports = AppointmentType;
