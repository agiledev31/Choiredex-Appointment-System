const graphql = require("graphql");
const StoreType = require("../types/StoreType");
const Store = require("../../models/store");
const Employee = require("../../models/employee");
const Notification = require("../../models/notification");
const { UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const createNotificationFunction = require("./notifications/createNotificationFunction");

const { GraphQLID } = graphql;

const UPDATED_EMPLOYEE = "getUpdatedEmployee";

const deleteStoreMutation = {
  type: StoreType,
  args: {
    _id: { type: GraphQLID },
  },
  async resolve(parent, args, context) {
    const adminAccessToken = context.cookies["admin-access-token"];

    if (!adminAccessToken) {
      throw new UserInputError("Admin is not authenticated.");
    } else {
      const deletedStore = await Store.findById({
        _id: args._id,
      });

      await Store.findByIdAndDelete({
        _id: args._id,
      });

      const decodedAdminID = jwt.decode(adminAccessToken).id.toString();

      const deletingEmployee = await Employee.findOne({
        _id: decodedAdminID,
      });

      let newNotification = new Notification({
        _id: new mongoose.Types.ObjectId(),
        new: true,
        type: "removeStore",
        originalAssociatedStaffFirstName: deletedStore.name,
        createdByFirstName: deletingEmployee.firstName,
        createdByLastName: deletingEmployee.lastName,
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
        _id: args._id,
        ...updatedEmployeeRes,
      };
    }
  },
};

module.exports = deleteStoreMutation;
