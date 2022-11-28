const graphql = require("graphql");
const ServiceType = require("../types/ServiceType");
const Service = require("../../models/service");

const { GraphQLList } = graphql;

const allServicesQuery = {
  type: new GraphQLList(ServiceType),
  async resolve(parent, args) {
    return await Service.find({});
  },
};

module.exports = allServicesQuery;
