import {
  Box,
  Grid,
  Button,
} from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import Autocomplete from "react-google-autocomplete";


const InitialPosition = (props) => {
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
              onClick={() => {
                console.log("use my location")
              }}
            >
              USE MY LOCATION
            </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Autocomplete
                className="autocomplete_initial_position"
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                style={{ width: "50%" }}
                onPlaceSelected={(place) => {
                  console.log(place);
                }}
                options={{
                  types: ["(regions)"],
                }}
                defaultValue="Amsterdam"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InitialPosition;
