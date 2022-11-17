import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
    Box,
    Button,
} from "@mui/material";
import ACTION_IS_STOREPAGE_ACTIVE from "../../actions/Services/ACTION_IS_STOREPAGE_ACTIVE";
import ACTION_IS_STOREPAGE_NOT_ACTIVE from "../../actions/Services/ACTION_IS_STOREPAGE_NOT_ACTIVE";
import "./Stepper.css";

const Stepper = () => {
    const dispatch = useDispatch();

    const storePageActive = useSelector(
        (state) => state.storePageActive.storePageActive
    );
    const switchPrevious = () => {
        dispatch(ACTION_IS_STOREPAGE_NOT_ACTIVE());
    }

    const switchNext = () => {
        dispatch(ACTION_IS_STOREPAGE_ACTIVE());
    }
    return (
        <div className="stepper_container">
            <Box sx={{ mb: 3 }}>
                {storePageActive && 
                    <Button
                        size="large"
                        variant="contained"
                        onClick={switchPrevious}
                    >
                        <KeyboardArrowLeft />
                        {/* {capitalize(t("form.previous"))} */}
                        Previous
                    </Button>
                }
                {!storePageActive && 
                    <Button
                        size="large"
                        variant="contained"
                        onClick={switchNext}
                    >
                        <KeyboardArrowRight />
                        {/* {capitalize(t("form.previous"))} */}
                        Next
                    </Button>
                }
            </Box>
        </div>
);
};

export default Stepper;

