 import React, { useState } from "react";
 import Location from "./location/Location";
 import "./StoreSelect.css";
 
 const StoreSelect = (props) => {

  // const {
  //   position,
  //   setPosition,
  //   locations,
  //   travelMode,
  //   setTravelMode,
  //   selectedLocation,
  //   selectLocation,
  //   setCompleted,
  // } = props;
  const locations = [
    {
      name: "Belle Étoile",
      address: "Rte d'Arlon, 8050 Bertrange, Luxembourg",
      coordinates: [10, 10],
      location_code: 0,
      group_id: 1,
      timezone: 1,
      countryID: 1
    }
  ];
  const [position, setPosition] =  useState({
    name: "Belle Étoile",
    address: "Route sans nom, 54530 Bayonville-sur-Mad, France",
    coordinates: [100, 100],
    location_code: 0,
    group_id: 1,
    timezone: 1,
    countryID: 1
  });
  const [travelMode, setTravelMode] =  useState(1);
  const [selectedLocation, setSelectedLocation] =  useState(null);
 
   return (
    <div className="store_select_view_container">
      <Location
        locations={ locations }
        position={position}
        setPosition={setPosition}
        travelMode={travelMode}
        setTravelMode={setTravelMode}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
    </div>
   );
 };
 
 export default StoreSelect;
 