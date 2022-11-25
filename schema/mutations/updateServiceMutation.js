const graphql = require("graphql");
const ServiceType = require("../types/ServiceType");
const Service = require("../../models/Service");
const { UserInputError } = require("apollo-server");

const { GraphQLString, GraphQLInt, GraphQLID } = graphql;

const updateServiceMutation = {
  type: ServiceType,
  args: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    duration: { type: GraphQLInt },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (!adminAccessToken) {
      throw new UserInputError("Admin is not authenticated.");
    } else {
      const service = await Service.findOneAndUpdate(
        {
          _id: args._id,
        },
        { 
          name: args.name,
          description: args.description,
         },
        {
          new: true,
        }
      );

      const res = await service.save();

      return {
        ...res,
        _id: service._id,
        name: service.name,
        description: service.description,
      };
    }
  },
};
module.exports = updateServiceMutation;
