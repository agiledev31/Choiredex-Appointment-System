import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import InitialPosition from "./initial-position/InitialPosition";
import LocationsList from "./locations-list/LocationsList";
import Map from "./map/Map";

import TravelModes from "./travel-modes/TravelModes";

const Location = (props) => {
  const {
    filteredStores,
    position,
    setPosition,
    selectedLocation,
    setSelectedLocation,
    } = props

  const [travelMode, setTravelMode] = useState(google.maps.TravelMode.DRIVING.toString());

  const calculateDistance = (position, store) => {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = position.coordinates.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = store.coordinateLat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (store.coordinateLng-position.coordinates.lng) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2))).toFixed(2);
    return d;
  }

  const calculateTravelTime = (position, store) => {
    var origin = new google.maps.LatLng( position.coordinates.lat, position.coordinates.lng ); // using google.maps.LatLng class
    var destination = new google.maps.LatLng(parseFloat(store.coordinateLat), parseFloat(store.coordinateLat)); // using string
    
    var directionsService = new google.maps.DirectionsService();

    var request = {
      origin: origin, // LatLng|string
      destination: destination, // LatLng|string
      travelMode: travelMode
    };

    directionsService.route( request, function( response, status ) {
      // if ( status === 'OK' ) {
          // var point = response.routes[ 0 ].legs[ 0 ];
          // console.log( 'Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')' );
          console.log(status, "point", response);
          // return point.duration.text;
      // }
    });
  }
  
  return (
    <Box>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <InitialPosition position={position} setPosition={setPosition} />
          <TravelModes travelMode={travelMode} setTravelMode={setTravelMode} />
          {position !== undefined && 
            <LocationsList
              locations={filteredStores}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              position={position}
              travelMode={travelMode}
              calculateDistance={calculateDistance}
              calculateTravelTime={calculateTravelTime}
            />
          }
        </Grid>
        <Grid item xs={12} md={6}>
          { position !== undefined && 
            <Map
              locations={filteredStores}
              position={position}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              calculateDistance={calculateDistance}
            />
          }
        </Grid>
      </Grid>
    </Box>
  );
};

export default Location;
