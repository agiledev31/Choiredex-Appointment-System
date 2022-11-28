const graphql = require("graphql");
const EmployeeType = require("../types/EmployeeType");
const Employee = require("../../models/employee");
const StoreInput = require("../types/inputs/StoreInput");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

// Hide usernames and passwords
require("dotenv").config();

const {
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = graphql;

const updateEmployeeMutation = {
  type: EmployeeType,
  args: {
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    employeeRole: { type: new GraphQLList(GraphQLString) },
    store: { type: new GraphQLList(StoreInput) },
  },
  async resolve(parent, args, context) {
    const token = context.cookies["admin-access-token"];

    if (!token) {
      throw new UserInputError("User is not authenticated.");
    } else {
      const employee = await Employee.findOneAndUpdate(
        {
          _id: args._id,
        },
        { 
          firstName: args.firstName.trim(),
          lastName: args.lastName.trim(),
          email: args.email,
          phoneNumber: args.phoneNumber,
          employeeRole: args.employeeRole,
          store: args.store ? args.store[0] : null
          },
        {
          new: true,
        }
      );

      const res = employee.save();

      return {
        ...res,
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        employeeRole: employee.employeeRole,
        createdAt: employee.createdAt,
        store: employee.store,
      };
    }
  },
};

module.exports = updateEmployeeMutation;
