/** @format */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { GoogleMap, Polyline, InfoWindow, Marker } from "@react-google-maps/api";
import React from "react";

export const containerStyle = {
  minHeight: "500px",
  minWidth: "100%",
};

const Map = (props) => {
  const {
    position,
    locations,
    selectedLocation,
    setSelectedLocation,
    calculateDistance,
  } = props;

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position?.coordinates}
        zoom={12}
        key="map"
      >
        {/* the marker for the selected location */}
        {selectedLocation !== undefined && (
          <Marker
            key="target"
            label={selectedLocation.name}
            position={{
              lat: parseFloat(selectedLocation.coordinateLat),
              lng: parseFloat(selectedLocation.coordinateLng)
            }}
            animation={google.maps.Animation.DROP}
          />
        )}

        {/* the Polyline for the selected location */}
        {selectedLocation !== undefined && (
          <Polyline
            key="polyline"
            path={[
              position == undefined ? {lat: 0, lng: 0} : position.coordinates, 
              {
                lat: parseFloat(selectedLocation.coordinateLat),
                lng: parseFloat(selectedLocation.coordinateLng)
              }
            ]}
            options={{
              strokeColor: red["700"],
            }}
          />
        )}

        {/* info window of selected location */}
        {selectedLocation !== undefined && (
          <InfoWindow
            key={""}
            position={{
              lat: parseFloat(selectedLocation.coordinateLat),
              lng: parseFloat(selectedLocation.coordinateLng)
            }}
            onCloseClick={function () {
              setSelectedLocation(undefined);
            }}
          >
            <>
              <Box key="text">
                <Typography key="name">
                  {selectedLocation.name}
                </Typography>
                <Typography key="address" variant="subtitle2">
                  {selectedLocation.address}
                </Typography>
                <Typography key="distance" variant="subtitle2">
                  {calculateDistance(position, selectedLocation)} km
                </Typography>
              </Box>
            </>
          </InfoWindow>
        )}

        {/* display only markers of locations that aren't selected */}
        {locations?.map((location, index) => {
          if (location._id !== selectedLocation?._id) {
            return (
              <Marker
                key={location._id}
                // icon={PositionIcon}
                position={{
                lat: parseFloat(location.coordinateLat),
                lng: parseFloat(location.coordinateLng)
              }}
                label={location.name}
                onClick={(location) => {
                  setSelectLocation({
                    location
                  });
                }}
              />
            );
          }

          return (
            <Marker
              key={location._id}
              position={{
                lat: parseFloat(location.coordinateLat),
                lng: parseFloat(location.coordinateLng)
              }}
              animation={google.maps.Animation.DROP}
            />
          );
        })}
      </GoogleMap>
  )
};
export default Map;