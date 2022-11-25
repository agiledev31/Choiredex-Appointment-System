const graphql = require("graphql");
const mongoose = require("mongoose");
const StoreType = require("../types/StoreType");
const Store = require("../../models/store");
const Employee = require("../../models/employee");
const Notification = require("../../models/notification");
const jwt = require("jsonwebtoken");
const createNotificationFunction = require("./notifications/createNotificationFunction");

const { GraphQLString, GraphQLInt, GraphQLList } = graphql;

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const addStoreMutation = {
  type: StoreType,
  args: {
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    coordinateLat: { type: GraphQLInt },
    coordinateLng: { type: GraphQLInt },
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
    if (adminAccessToken) {
      let store = new Store({
        _id: new mongoose.Types.ObjectId(),
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
      });
      const newStoreRes = store.save();

      const decodedAdminID = jwt.decode(adminAccessToken).id.toString();

      const addingEmployee = await Employee.findOne({
        _id: decodedAdminID,
      });

      let newNotification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        new: true,
        type: "addStore",
        originalAssociatedStaffFirstName: args.name,
        createdByFirstName: addingEmployee.firstName,
        createdByLastName: addingEmployee.lastName,
        createdAt: Date.now(),
      });

      const updateNotifications = (staff) =>
        createNotificationFunction(newNotification, staff);

      (
        await Employee.find({
          employeeRole: "Admin",
          _id: { $ne: decodedAdminID },
        })
      ).forEach((currentEmployee) => {
        const notificationsObj = updateNotifications(currentEmployee);
        currentEmployee.notifications = notificationsObj.notifications;

        currentEmployee.save();
      });

      const updatedEmployee = await Employee.findOne(
        { _id: decodedAdminID },
        (err, currentEmployee) => {
          const notificationsObj = updateNotifications(currentEmployee);
          currentEmployee.notifications = notificationsObj.notifications;

          currentEmployee.save();
        }
      );

      const updatedEmployeeRes = await updatedEmployee.save();

      context.pubsub.publish(UPDATED_EMPLOYEE, {
        employee: updatedEmployeeRes,
      });

      return {
        ...newStoreRes,
        ...updatedEmployeeRes,
      }
    }
  },
};

module.exports = addStoreMutation;
