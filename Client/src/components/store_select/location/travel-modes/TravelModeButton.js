import Button from "@mui/material/Button";
import React from "react";
const TravelModeButton = (props) => {

  return (
    <Button
      color="info"
      onClick={() => {
        props.setTravelMode(props.mode);
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
