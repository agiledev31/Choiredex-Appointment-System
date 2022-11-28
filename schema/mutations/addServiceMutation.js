const graphql = require("graphql");
const mongoose = require("mongoose");
const ServiceType = require("../types/ServiceType");
const Service = require("../../models/service");
const Employee = require("../../models/employee");
const Notification = require("../../models/notification");
const jwt = require("jsonwebtoken");
const createNotificationFunction = require("./notifications/createNotificationFunction");

const { GraphQLString, GraphQLInt } = graphql;

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const addServiceMutation = {
  type: ServiceType,
  args: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    duration: { type: GraphQLInt },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];
    if (adminAccessToken) {
      let service = new Service({
        _id: new mongoose.Types.ObjectId(),
        name: args.name.trim(),
        description: args.description.trim(),
        duration: args.duration,
      });
      const newServiceRes = service.save();

      const decodedAdminID = jwt.decode(adminAccessToken).id.toString();

      const addingEmployee = await Employee.findOne({
        _id: decodedAdminID,
      });

      let newNotification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        new: true,
        type: "addService",
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
        ...newServiceRes,
        ...updatedEmployeeRes,
      }
    }
  },
};

module.exports = addServiceMutation;
