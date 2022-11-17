import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { darken } from "@mui/material/styles";
import React from "react";
import { useTranslation } from "react-i18next";


const LocationsListItem = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <Box
        // sx={{
        //   p: 2,
        //   backgroundColor: (theme) => {
        //     if (selectedLocation?.location.id === location.location.id) {
        //       return darken(theme.palette.background.default, 0.05);
        //     }
        //     return theme.palette.background.paper;
        //   },
        // }}
        // key={`location-${location.location.id}`}
        // onClick={() => selectLocation(location)}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            component="span"
            variant="body2"
            color="textPrimary"
            gutterBottom
          >
            {/* {location.location.name} */}
            Belle Étoile
          </Typography>

          <Typography
            component="span"
            variant="body2"
            color="textPrimary"
            gutterBottom
          >
            {/* {location.location.address} */}
            Rte d'Arlon, 8050 Bertrange, Luxembourg
          </Typography>
        </Box>

        {/* {location.direction !== undefined ? ( */}
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" color="textPrimary">
                {/* {humanizeDistance(location.direction.distance, t)} */}
                57km
              </Typography>

              <Typography variant="body2" color="textPrimary">
                {/* {humanizeDuration(location.direction.durationInSeconds, t)} */}
                45min
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
