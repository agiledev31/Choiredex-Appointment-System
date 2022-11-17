 import React, { useState } from "react";
 import Location from "./location/Location";
 import "./StoreSelect.css";
 
 const StoreSelect = (props) => {

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
  const [position, setPosition] =  useState(undefined);
  // {
  //   name: "Belle Étoile",
  //   address: "Route sans nom, 54530 Bayonville-sur-Mad, France",
  //   coordinates: {
  //     lat: 0,
  //     lng: 0,
  //   },
  //   location_code: 0,
  //   group_id: 1,
  //   countryID: 1
  // }
  const [travelMode, setTravelMode] =  useState(1);
  const [selectedLocation, setSelectedLocation] =  useState(undefined);
 
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
 