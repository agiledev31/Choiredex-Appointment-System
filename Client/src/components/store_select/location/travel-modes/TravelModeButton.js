/** @format
 * Button that set the travel mode for Google Maps
 * Opacity is used to display the selection
 */
import Button from "@mui/material/Button";
import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

// interface Properties extends TravelModesProps {
//   // Icon, better be very black as it get opacity 50% if unselected
//   icon: typeof SvgIcon;

//   // travel mode that is set to ParentProperties Hook if it's clicked on
//   mode: google.maps.TravelMode;
// }

const TravelModeButton = (props) => {

  return (
    <Button
      color="info"
      onClick={() => {
        // props.setTravelMode(props.mode);
      }}
    >
      <props.icon
        sx={{
          opacity: () => {
            if (props.mode === props.travelMode) {
              return 1.0;
            }
            return 0.5;
          },
        }}
      />
    </Button>
  );
};

export default TravelModeButton;
