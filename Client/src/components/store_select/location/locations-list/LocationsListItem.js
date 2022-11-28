import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { darken } from "@mui/material/styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";


const LocationsListItem = (props) => {
  const {
    selectedLocation,
    setSelectedLocation,
    location,
    calculateDistance,
    calculateTravelTime,
    position,
  } = props;
  const { t } = useTranslation();

  const selectStore = () => {
    if(selectedLocation !== location) {
      setSelectedLocation(location);
    }else{
      setSelectedLocation(undefined);
    }
  }

  return (
    <>
      <Box className="store_item_container"
        sx={{
          p: 2,
          backgroundColor: (theme) => {
            if (selectedLocation?._id === location._id) {
              return darken(theme.palette.background.default, 0.08);
            }
            return theme.palette.background.paper;
          },
        }}
        key={`location-${location._id}`}
        onClick={() => selectStore()}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            component="span"
            variant="body2"
            color="textPrimary"
            gutterBottom
          >
            {location.name}
          </Typography>

          <Typography
            component="span"
            variant="body2"
            color="textPrimary"
            gutterBottom
          >
            {location.address}
          </Typography>
        </Box>

        {/* {location.direction !== undefined ? ( */}
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="textPrimary">
                {calculateDistance(position, location)} km
              </Typography>
              <Typography variant="body2" color="textPrimary">
                {calculateTravelTime(position, location)}
              </Typography>
            </Box>
          </>
        {/* ) : (
          <Alert severity="error">
            {t("appointment.locations.distance.unsupportedTravelMode")}
          </Alert>
        )} */}
      </Box>
      <Divider />
    </>
  );
};

export default LocationsListItem;
