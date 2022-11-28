import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { css } from "@emotion/css";
import BounceLoader from "react-spinners/BounceLoader";
import { LoadScript } from "@react-google-maps/api";

import ACTION_NAVBAR_IS_VISIBLE from "../../actions/NavbarIsVisible/ACTION_NAVBAR_IS_VISIBLE";
import ACTION_SELECTED_DAY_RESET from "../../actions/SelectedDay/ACTION_SELECTED_DAY_RESET";
import ACTION_SELECT_TIME_NOT_ACTIVE from "../../actions/SelectTimeActive/ACTION_SELECT_TIME_NOT_ACTIVE";
import ACTION_LOADING_SPINNER_RESET from "../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import ACTION_LOADING_SPINNER_ACTIVE from "../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";

import Location from "./location/Location";
import "./StoreSelect.css";

 const StoreSelect = (props) => {
  const {
    selectedServiceName,
    getAllStoresData,
    getAllStoresRefetch,
    getAllStoresLoading,
    getAllStoresError,
  } = props;
  const dispatch = useDispatch();

  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );
  const imageLoading = useSelector((state) => state.imageLoading.image_loading);

  const [libraries, setLibraries] = useState(["places"]);
  const [filteredStores, changeFilteredStored] = useState([]);
  const [position, setPosition] =  useState(undefined);
  const [selectedLocation, setSelectedLocation] =  useState(props.selectedStore);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  useMemo(() => {
    if (getAllStoresData) {
      if (getAllStoresData.all_stores.length > 0) {
        if (selectedServiceName) {
          changeFilteredStored(
            [...getAllStoresData.all_stores].filter((item) => {
              return item.availableServices.includes(selectedServiceName)
            })
          );
        }
      }
    }
  }, [selectedServiceName, getAllStoresData]);

  useEffect(() => {
    if (getAllStoresLoading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    } else {
      dispatch(ACTION_LOADING_SPINNER_RESET());
    }
  }, [dispatch, getAllStoresLoading]);

  useEffect(() => {
    if (getAllStoresError) {
      getAllStoresRefetch();
    }
  }, [getAllStoresError, getAllStoresRefetch]);

  const locationSelected = (location) => {
    if (location == undefined) {
      dispatch(ACTION_SELECTED_DAY_RESET());
      dispatch(ACTION_SELECT_TIME_NOT_ACTIVE());
      dispatch(ACTION_NAVBAR_IS_VISIBLE());

      props.changeSelectedStore(undefined)
      setSelectedLocation(undefined)
    } else {
      dispatch(ACTION_NAVBAR_IS_VISIBLE());
      props.changeSelectedStore(location)
      setSelectedLocation(location)
    }
  }
 
   return (
    <div className="store_select_view_container">
      <Modal
        isOpen={imageLoading || loadingSpinnerActive || getAllStoresLoading}
        style={{
          content: {
            position: "fixed",
            zIndex: "10000",
            height: "100%",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            paddingBottom: "10%",
            borderRadius: "none",
            width: "100vw",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <BounceLoader
          size={100}
          css={override}
          color={"rgb(44, 44, 52)"}
          loading={imageLoading || loadingSpinnerActive || getAllStoresLoading}
        />
      </Modal>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <Location
          filteredStores={filteredStores}
          position={position}
          setPosition={setPosition}
          selectedLocation={selectedLocation}
          setSelectedLocation={(location) => locationSelected(location)}
        />
      </LoadScript>
    </div>
   );
 };
 
 export default StoreSelect;
 