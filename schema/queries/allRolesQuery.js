const graphql = require("graphql");
const RoleType = require("../types/RoleType");
const Role = require("../../models/role");

const { GraphQLList } = graphql;

const allRolesQuery = {
  type: new GraphQLList(RoleType),
  async resolve(parent, args) {
    return await Role.find({});
  },
};

module.exports = allRolesQuery;
