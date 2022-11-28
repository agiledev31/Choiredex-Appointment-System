const graphql = require("graphql");

const {
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
  GraphQLInputObjectType,
} = graphql;

const StoreInput = new GraphQLInputObjectType({
  name: "StoreInput",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    coordinateLat: { type: GraphQLString },
    coordinateLng: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    website: { type: GraphQLString },
    timezone: { type: GraphQLString },
    availableServices: { type: new GraphQLList(GraphQLString) },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = StoreInput;
