import React from "react";
import Availability from "./Date/Availability";
import TimePreference from "./Time/TimePreference";
import { Switch, Route } from "react-router-dom";

const AvailabilityRouter = (props) => {
  const {
    selectedStore
  } = props;

  return (
    <Switch>
      <Route
        exact
        path={props.path}
        render={() => (
          <Availability
            selectedStore={selectedStore}
            initialScreenSize={props.initialScreenSize}
            currentScreenSize={props.currentScreenSize}
            getEmployeesData={props.getEmployeesData}
          />
        )}
      />
      <Route
        exact
        path={props.path + "/timepreference"}
        render={() => (
          <TimePreference
            selectedStore={selectedStore}
            initialScreenSize={props.initialScreenSize}
            currentScreenSize={props.currentScreenSize}
          />
        )}
      />
    </Switch>
  );
};

export default AvailabilityRouter;
