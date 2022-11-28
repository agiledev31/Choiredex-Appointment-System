import React, {useEffect, useState} from "react";
import {
  Box,
  Grid,
  Button,
} from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import ClearIcon from "@mui/icons-material/Clear";
import { Autocomplete } from "@react-google-maps/api";

const InitialPosition = (props) => {

  const [autocompletebody, setAutocompletebody] = useState(null);
  const [myPosition, setMyPosition] = useState("")
  const [searchKey, setSearchKey] = useState("")

  


  // If browser supports navigator.geolocation, generate Lat/Long else let user know there is an error
  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, posError); // Passing in a success callback and an error callback fn
    } else {
      alert("Sorry, Geolocation is not supported by this browser."); // Alert is browser does not support geolocation
    }
  }
  // Geolocation error callback fn. Query permissions to check if the error occured due to user not allowing location to be shared
  const posError = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then(res => {
        if (res.state === "denied") {
          alert("Enable location permissions for this website in your browser settings.")
        }
      })
    } else {
    alert("Unable to access your location. You can continue by submitting location manually.") // Obtaining Lat/long from address necessary
    }
  }
  // Geolocation success callback fn
  const showPosition = (position) => {
    let lat = position.coords.latitude // You have obtained latitude coordinate!
    let long = position.coords.longitude // You have obtained longitude coordinate!
    getAddress(lat, long, process.env.REACT_APP_GOOGLE_MAPS_API_KEY) // Will convert lat/long to City, State, & Zip code
  }
  // Converting lat/long from browser geolocation into city, state, and zip code using Google Geocoding API
  const getAddress = (lat, long, googleKey) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${googleKey}`)
    .then(res => res.json())
    .then(address => setZip(address))
  }
  // Dispatching city, state, and zip code to store state
  const setZip = (address) => {
    console.log("my position", address)
    props.setPosition({
        name: address.results[0].address_components[2].short_name,
        address: address.results[2].formatted_address,
        coordinates: {
          lat: address.results[2].geometry.location.lat,
          lng: address.results[2].geometry.location.lng,
        },
        location_code: address.results[0].place_id,
        group_id: 1,
        countryID: address.results[0].address_components[3].short_name,
    });

    setMyPosition(address.results[0].formatted_address);
  }

  const onLoad = (e) => {
    setAutocompletebody(e)
  }

  const onPlaceChanged = () => {
    if (autocompletebody !== null) {
      manualPosition(autocompletebody.getPlace());
    console.log("select position", autocompletebody.getPlace())

    } else {
      console.log("Autocomplete is not loaded yet!")
    }
  }
  
  const searchKeyInput = (e) => {
    // setSearchKey(e.target.value);
  }

  const manualPosition = (place) => {
    setSearchKey(place.formatted_address);
    getCoordinates(place.formatted_address, process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  }

  const getCoordinates = (address, googleKey) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`)
    .then(res => res.json())
    .then(address => setManualZip(address))
  }

  const setManualZip = (address) => {
    let location = {
      name: address.results[0].address_components[0].short_name,
      address: address.results[0].formatted_address,
      coordinates: {
        lat: address.results[0].geometry.location.lat,
        lng: address.results[0].geometry.location.lng,
      },
      location_code: address.results[0].place_id,
      group_id: 1,
      countryID: address.results[0].address_components[2].short_name,
    };
    props.setPosition(location);
  }

  const clearPosition = () => {
    setSearchKey("");
    setMyPosition("")
    props.setPosition(undefined);
  }

  useEffect(() => {
    setTimeout(() => {
      getPosition();
      console.log("get my position")
    }, 1500)
  }, [])

  return (
    <>
      <Box
        sx={{
          pb: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box>
              <Button
                className="use_mylocation_btn"
                endIcon={<NearMeIcon />}
                onClick={() => getPosition() }
              >
                USE MY LOCATION
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Autocomplete
                className=""
                onLoad={(e) => onLoad(e)}
                onPlaceChanged={(e) => onPlaceChanged(e)}
              >
                <div className="autocomplete_initial_position_container">
                  <input
                    className="autocomplete_initial_position"
                    type="text"
                    placeholder="Customized your placeholder"
                    onChange={(e) => searchKeyInput(e)}
                    // value = { searchKey }
                  />
                  {/* <span 
                    className="position_clear_btn"
                    onClick={() => clearPosition()}
                  >
                    <ClearIcon />
                  </span> */}
                </div>
              </Autocomplete>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InitialPosition;
