import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { LoadScript } from "@react-google-maps/api";

import InitialPosition from "./initial-position/InitialPosition";
import LocationsList from "./locations-list/LocationsList";
import Map from "./map/Map";

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
    } = props

  const [libraries, setLibraries] = useState(["places"]);
  
  return (
    <Box>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <InitialPosition position={position} setPosition={setPosition} />
            <TravelModes travelMode={travelMode} setTravelMode={setTravelMode} />
            <LocationsList
              locations={locations}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              position={position}
              travelMode={travelMode}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Map
              locations={locations}
              position={position}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </Grid>
        </Grid>
        </LoadScript>
    </Box>
  );
};

export default Location;
