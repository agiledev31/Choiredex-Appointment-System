/** @format */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { LoadScript, GoogleMap, Polyline, InfoWindow, Marker } from "@react-google-maps/api";
import React, { useState } from "react";

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
  } = props;
  // const [position, setPosition] = useState(props.position)

  console.log("props", props.selectedLocation)

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
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
            position={selectedLocation.coordinates}
            // animation={google.maps.Animation.DROP}
          />
        )}

        {/* the Polyline for the selected location */}
        {selectedLocation !== undefined && (
          <Polyline
            key="polyline"
            path={[position.coordinates, selectedLocation.name]}
            options={{
              strokeColor: red["700"],
            }}
          />
        )}

        {/* info window of selected location */}
        {selectedLocation !== undefined && (
          <InfoWindow
            key={""}
            position={selectedLocation.name}
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
                {/* {selectedLocation.direction !== undefined && (
                  <>
                    <Typography key="distance" variant="subtitle2">
                      {humanizeDistance(selectedLocation.direction.distance, t)}
                    </Typography>
                  </>
                )} */}
              </Box>
            </>
          </InfoWindow>
        )}

        {/* display only markers of locations that aren't selected */}
        {/* {locations?.locations.map((location, index) => {
          if (location.location_code !== selectedLocation?.location_code) {
            return (
              <Marker
                key={location.name}
                // icon={PositionIcon}
                position={
                  new IGeographyValue(
                    locationCoordinatesToPosition(location.coordinates),
                  )
                }
                label={location.name}
                onClick={(item) => {
                  setSelectLocation({
                    location
                  });
                }}
              />
            );
          }

          return (
            <Marker
              key="visitor"
              position={position}
              // icon={VisitorIcon}
              // animation={google.maps.Animation.DROP}
            />
          );
        })} */}
      </GoogleMap>
    </LoadScript>
    
  );
};

export default Map;
