import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ACTION_REJUVENATE_IN_CART from "../../actions/InCart/Treatments/Rejuvenate/ACTION_REJUVENATE_IN_CART";
import ACTION_REJUVENATE_NOT_IN_CART from "../../actions/InCart/Treatments/Rejuvenate/ACTION_REJUVENATE_NOT_IN_CART";
import ACTION_NAVBAR_IS_VISIBLE from "../../actions/NavbarIsVisible/ACTION_NAVBAR_IS_VISIBLE";
import ACTION_INCREMENT_COUNTER from "../../actions/Counter/ACTION_INCREMENT_COUNTER";
import ACTION_DECREMENT_COUNTER from "../../actions/Counter/ACTION_DECREMENT_COUNTER";
import ACTION_SELECTED_DAY_RESET from "../../actions/SelectedDay/ACTION_SELECTED_DAY_RESET";
import ACTION_SELECT_TIME_NOT_ACTIVE from "../../actions/SelectTimeActive/ACTION_SELECT_TIME_NOT_ACTIVE";

import Location from "./location/Location";
import "./StoreSelect.css";
 
const locations = [
  {
    manager: {
      first_name: "Pat",
      last_name: "Lat"
    },
    name: "Belle-et-Houllefort",
    address: "Route sans nom, 54530 Bayonville-sur-Mad, France",
    coordinates: {
      lat: 50.745881, 
      lng: 1.759262,
    },
    location_code: "ChIJS7N8uP4z3EcRjMgFQmjNs_0",
    group_id: 1,
    countryID: "FR"
  },
  // {
  //   manager: {
  //     name: "Pat",
  //   },
  //   name: "Wrocław",
  //   address: "Wrocław, Poland",
  //   coordinates: {
  //       lat: 51.1078852,
  //       lng: 17.0385376
  //   },
  //   location_code: "ChIJv4q11MLpD0cR9eAFwq5WCbc",
  //   group_id: 1,
  //   countryID: "Lower Silesian Voivodeship"
  // },
  // {
  //   manager: {
  //     name: "Rene",
  //   },
  //   name: "York",
  //   address: "York, UK",
  //   coordinates: {
  //       lat: 53.9614205,
  //       lng: -1.0739108
  //   },
  //   location_code: "ChIJ8WWY4UDDeEgR0eRUiomrdEc",
  //   group_id: 1,
  //   countryID: "York"
  // }
]

 const StoreSelect = (props) => {
  const dispatch = useDispatch();

  // store in cart
  const rejuvenateInCart = useSelector(
    (state) => state.rejuvenateInCart.in_cart
  );

  const [position, setPosition] =  useState(undefined);
  const [travelMode, setTravelMode] =  useState(1);
  const [selectedLocation, setSelectedLocation] =  useState(props.selectedStore);
  const locationSelected = (location) => {
    console.log("selected location", location);
    if (location == undefined) {
      dispatch(ACTION_REJUVENATE_NOT_IN_CART());
      dispatch(ACTION_DECREMENT_COUNTER());
      dispatch(ACTION_SELECTED_DAY_RESET());
      dispatch(ACTION_SELECT_TIME_NOT_ACTIVE());
      dispatch(ACTION_NAVBAR_IS_VISIBLE());

      props.resetAllCartStates();
      props.setSelectedStore(undefined)
      setSelectedLocation(undefined)
    } else {
      dispatch(ACTION_REJUVENATE_IN_CART());
      dispatch(ACTION_INCREMENT_COUNTER());
      dispatch(ACTION_NAVBAR_IS_VISIBLE());
      
      props.setSelectedStore(location)
      setSelectedLocation(location)
    }
  }
 
   return (
    <div className="store_select_view_container">
      <Location
        locations={ locations }
        position={position}
        setPosition={setPosition}
        travelMode={travelMode}
        setTravelMode={setTravelMode}
        selectedLocation={selectedLocation}
        setSelectedLocation={(location) => locationSelected(location)}
      />
    </div>
   );
 };
 
 export default StoreSelect;
 