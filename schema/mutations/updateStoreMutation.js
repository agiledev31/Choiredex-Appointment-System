const graphql = require("graphql");
const StoreType = require("../types/StoreType");
const Store = require("../../models/store");
const { UserInputError } = require("apollo-server");

const { GraphQLString, GraphQLInt, GraphQLID, GraphQLList } = graphql;

const updateStoreMutation = {
  type: StoreType,
  args: {
    _id: { type: GraphQLID },
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
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (!adminAccessToken) {
      throw new UserInputError("Admin is not authenticated.");
    } else {
      const store = await Store.findOneAndUpdate(
        {
          _id: args._id,
        },
        { 
          name: args.name.trim(),
          address: args.address.trim(),
          coordinateLat: args.coordinateLat,
          coordinateLng: args.coordinateLng,
          city: args.city.trim(),
          country: args.country.trim(),
          phone: args.phone,
          email: args.email,
          website: args.website.trim(),
          timezone: args.timezone.trim(),
          availableServices: args.availableServices,
         },
        {
          new: true,
        }
      );

      const res = await store.save();

      return {
        ...res,
        _id: store._id,
        name: store.name,
        description: store.description,
      };
    }
  },
};
module.exports = updateStoreMutation;
