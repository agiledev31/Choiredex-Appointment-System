const graphql = require("graphql");
const StoreType = require("../types/StoreType");
const Store = require("../../models/store");

const { GraphQLList } = graphql;

const allStoresQuery = {
  type: new GraphQLList(StoreType),
  async resolve(parent, args) {
    return await Store.find({});
  },
};

module.exports = allStoresQuery;
