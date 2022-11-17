/** @format
 * Component that list all available Locations from API and allow users to pick one
 */
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import LocationsListItem from "./LocationsListItem";

const LocationsList = (props) => {
  const {
    locations,
    selectedLocation,
    setSelectedLocation
  } = props;

  return (
    <Box mt={2}>
      <List
        sx={{
          width: "100%",
        }}
      >
        {locations.map((item) => (
          <LocationsListItem
            key={item.location_code}
            location={item}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        ))}
      </List>
    </Box>
  );
};

export default LocationsList;
