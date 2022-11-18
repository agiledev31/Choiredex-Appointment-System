import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
    Box,
    Button,
} from "@mui/material";
import ACTION_IS_STOREPAGE_ACTIVE from "../../actions/Services/ACTION_IS_STOREPAGE_ACTIVE";
import ACTION_IS_STOREPAGE_NOT_ACTIVE from "../../actions/Services/ACTION_IS_STOREPAGE_NOT_ACTIVE";
import ACTION_RESET_COUNTER from "../../actions/Counter/ACTION_RESET_COUNTER";
import "./Stepper.css";

const Stepper = () => {
    const dispatch = useDispatch();
    const calmInCart = useSelector((state) => state.calmInCart.in_cart);
    const clarifyInCart = useSelector((state) => state.clarifyInCart.in_cart);
    const bacialInCart = useSelector((state) => state.bacialInCart.in_cart);
    const glowInCart = useSelector((state) => state.glowInCart.in_cart);

    const storePageActive = useSelector(
        (state) => state.storePageActive.storePageActive
    );
    const [temp, setTemp] = useState(false)
    const switchPrevious = () => {
        dispatch(ACTION_IS_STOREPAGE_NOT_ACTIVE());
        dispatch(ACTION_RESET_COUNTER());

    }

    const switchNext = () => {
        if(!temp) {
            setTemp(true);
            dispatch(ACTION_IS_STOREPAGE_ACTIVE());
            setTimeout(() =>{
                dispatch(ACTION_IS_STOREPAGE_NOT_ACTIVE());
                dispatch(ACTION_IS_STOREPAGE_ACTIVE());
            }, 300)
        }
        dispatch(ACTION_IS_STOREPAGE_ACTIVE())
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
                        disabled={!(calmInCart || clarifyInCart || bacialInCart || glowInCart)}
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

