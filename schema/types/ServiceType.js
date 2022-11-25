const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = graphql;

const ServiceType = new GraphQLObjectType({
  name: "ServiceType",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    duration: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = ServiceType;
