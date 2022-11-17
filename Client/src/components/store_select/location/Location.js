/** @format
 * Component that let visitor select travel mode, initial position and a location
 */
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";

import InitialPosition from "./initial-position/InitialPosition";
import LocationsList from "./locations-list/LocationsList";
// import Map from "./map/Map";
import TravelModes from "./travel-modes/TravelModes";

const Location = (props) => {
  const {
  locations,
  position,
  setPosition,
  travelMode,
  setTravelMode,
  selectedLocation,
  setSelectedLocation,
  } = props;

  return (
    <Box>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <InitialPosition position={position} setPosition={setPosition} />
          <TravelModes travelMode={travelMode} setTravelMode={setTravelMode} />
          <LocationsList
            isMeeting={false}
            locations={locations}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            position={position}
            travelMode={travelMode}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <Map
            locations={locations}
            travelMode={travelMode}
            setTravelMode={setTravelMode}
            position={position}
            setPosition={setPosition}
            selectedLocation={selectedLocation}
            selectLocation={selectLocation}
          /> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Location;
