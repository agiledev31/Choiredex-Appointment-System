/** @format */
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { GoogleMap, Polyline, InfoWindow } from "@react-google-maps/api";
import { Marker } from "@react-google-maps/api";
import React, { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import config from "../../../../config";
import { IGeographyValue } from "../../../../graphql/postgis";
import { humanizeDistance } from "../../../../utils/googleMaps";
import PositionIcon from "../../../common/icons/PositionIcon";
import VisitorIcon from "../../../common/icons/VisitorIcon";
import {
  locationCoordinatesToPosition,
  locationsRadiusToLocation,
  MapProps,
} from "../Location.types";
import Attendance from "../attendance/Attendance";

export const containerStyle = {
  minHeight: "500px",
  minWidth: "100%",
};

const AppointmentLocationsMapComponent: FC<MapProps> = ({
  selectLocation,
  selectedLocation,
  position,
  locations,
}) => {
  const { t } = useTranslation();

  const selectedPositionGeography = useMemo<IGeographyValue | undefined>(
    function () {
      if (selectedLocation !== undefined) {
        return new IGeographyValue(selectedLocation.location.position);
      }
      return undefined;
    },
    [selectedLocation],
  );

  const positionGeography = useMemo<IGeographyValue>(
    function () {
      return new IGeographyValue(position);
    },
    [position],
  );

  if (VisitorIcon.anchor == null) {
    VisitorIcon.anchor = new google.maps.Point(12, 12);
  }

  if (PositionIcon.anchor == null) {
    PositionIcon.anchor = new google.maps.Point(12, 12);
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={positionGeography}
      zoom={config.googleMapsDefaultZoom}
      key="map"
    >
      {/* the marker for the selected location */}
      {selectedLocation !== undefined && (
        <Marker
          key="target"
          label={selectedLocation.location.name}
          position={selectedPositionGeography!}
          animation={google.maps.Animation.DROP}
        />
      )}

      {/* the Polyline for the selected location */}
      {selectedLocation !== undefined && (
        <Polyline
          key="polyline"
          path={[positionGeography, selectedPositionGeography!]}
          options={{
            strokeColor: red["900"],
          }}
        />
      )}

      {/* info window of selected location */}
      {selectedLocation !== undefined && (
        <InfoWindow
          key={""}
          position={selectedPositionGeography}
          onCloseClick={function () {
            selectLocation(undefined);
          }}
        >
          <>
            <Box key="text">
              <Typography key="name">
                {selectedLocation.location.name}
              </Typography>
              <Typography key="address" variant="subtitle2">
                {selectedLocation.location.address}
              </Typography>
              {selectedLocation.direction !== undefined && (
                <>
                  <Typography key="distance" variant="subtitle2">
                    {humanizeDistance(selectedLocation.direction.distance, t)}
                  </Typography>
                </>
              )}
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end" }}
              key="icon"
            >
              <IconButton
                sx={{ p: 0, m: 0 }}
                onClick={() => {
                  selectLocation(undefined);
                }}
                color="secondary"
              >
                <CancelIcon />
              </IconButton>
            </Box>
            <Attendance location={selectedLocation.location} />
          </>
        </InfoWindow>
      )}

      {/* display only markers of locations that aren't selected */}
      {locations?.locations.map((location, index: number) => {
        if (location._id !== selectedLocation?.location.id) {
          return (
            <Marker
              key={location.name}
              icon={PositionIcon}
              position={
                new IGeographyValue(
                  locationCoordinatesToPosition(location.coordinates),
                )
              }
              label={location.name}
              onClick={(item) => {
                selectLocation({
                  location: locationsRadiusToLocation(locations, index),
                });
              }}
            />
          );
        }

        /* the marker for the position of the visitor itself */
        return (
          <Marker
            key="visitor"
            position={positionGeography}
            icon={VisitorIcon}
            animation={google.maps.Animation.DROP}
          />
        );
      })}
    </GoogleMap>
  );
};

export default AppointmentLocationsMapComponent;
