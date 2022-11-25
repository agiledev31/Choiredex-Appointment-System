const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;

const RoleType = new GraphQLObjectType({
  name: "RoleType",
  fields: () => ({
    _id: {
      type: GraphQLID,
    },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = RoleType;
