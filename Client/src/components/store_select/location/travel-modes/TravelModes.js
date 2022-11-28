/** @format
 * Component that allow users to select a Google Maps Travel mode.
 * Only 1 mode can be selected at the same time.
 */
import CommuteIcon from "@mui/icons-material/Commute";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";

import TravelModeButton from "./TravelModeButton";

const TravelModes = (props) => {
  return (
    <div className="travel_mode_btn_group_container">
      <span>Book for now(depart right now)</span>
      <ButtonGroup
        variant="text"
        color="success"
        aria-label="text primary button group"
      >
        <TravelModeButton
          key={google.maps.TravelMode.BICYCLING.toString()}
          icon={DirectionsBikeIcon}
          mode={google.maps.TravelMode.BICYCLING}
          travelMode={props.travelMode}
          setTravelMode={props.setTravelMode}
        />

        <TravelModeButton
          key={google.maps.TravelMode.DRIVING.toString()}
          icon={DriveEtaIcon}
          mode={google.maps.TravelMode.DRIVING}
          travelMode={props.travelMode}
          setTravelMode={props.setTravelMode}
        />

        <TravelModeButton
          key={google.maps.TravelMode.TRANSIT.toString()}
          icon={CommuteIcon}
          mode={google.maps.TravelMode.TRANSIT}
          travelMode={props.travelMode}
          setTravelMode={props.setTravelMode}
        />

        <TravelModeButton
          key={google.maps.TravelMode.WALKING.toString()}
          icon={DirectionsWalkIcon}
          mode={google.maps.TravelMode.WALKING}
          travelMode={props.travelMode}
          setTravelMode={props.setTravelMode}
        />
      </ButtonGroup>
    </div>
  );
};

export default TravelModes;
