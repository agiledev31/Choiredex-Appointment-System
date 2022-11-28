import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
    Box,
    Button,
    Link,
} from "@mui/material";
import ACTION_IS_STOREPAGE_ACTIVE from "../../actions/Services/ACTION_IS_STOREPAGE_ACTIVE";
import ACTION_IS_STOREPAGE_NOT_ACTIVE from "../../actions/Services/ACTION_IS_STOREPAGE_NOT_ACTIVE";
import ACTION_CART_PAGE_OPENED from "../../actions/InCart/CartPageOpened/ACTION_CART_PAGE_OPENED";

import ACTION_CART_IS_ACTIVE from "../../actions/CartIsActive/ACTION_CART_IS_ACTIVE";
import ACTION_CART_PAGE_RESET from "../../actions/InCart/CartPageOpened/ACTION_CART_PAGE_RESET";
import ACTION_AVAILABILITY_PAGE_OPENED from "../../actions/InCart/CartPageOpened/ACTION_AVAILABILITY_PAGE_OPENED";
import ACTION_SELECTED_ESTHETICIAN from "../../actions/SelectedEsthetician/ACTION_SELECTED_ESTHETICIAN";
import ACTION_SELECTED_ESTHETICIAN_RESET from "../../actions/SelectedEsthetician/ACTION_SELECTED_ESTHETICIAN_RESET";
import ACTION_CART_IS_NOT_ACTIVE from "../../actions/CartIsActive/ACTION_CART_IS_NOT_ACTIVE";
import ACTION_AVAILABILITY_CLICKED from "../../actions/AvailabilityClicked/ACTION_AVAILABILITY_CLICKED";
import "./Stepper.css";

const Stepper = (props) => {
    const { 
        selectedServiceName,
        selectedStore
    } = props;
    const dispatch = useDispatch();

    const cartIsActive = useSelector((state) => state.cartIsActive.cartIsActive);
    const cartPageOpened = useSelector(
      (state) => state.cartPageOpened.cart_page_opened
    );
    const availabilityClicked = useSelector(
        (state) => state.availabilityClicked.availabilityClicked
      );

    const storePageActive = useSelector(
        (state) => state.storePageActive.storePageActive
    );
    const [temp, setTemp] = useState(false)
    const switchPrevious = () => {
        dispatch(ACTION_IS_STOREPAGE_NOT_ACTIVE());
    }

    const switchNext = () => {
        if(!temp) {
            setTemp(true);
            dispatch(ACTION_IS_STOREPAGE_ACTIVE());
        }
        dispatch(ACTION_IS_STOREPAGE_ACTIVE())
    }

    const cartActivated = () => {
        dispatch(ACTION_CART_IS_ACTIVE());
        document.body.style.setProperty("background", "rgb(255, 255, 255)");
        // toast.dismiss();
    };
    
    const cartDeactivated = () => {
        dispatch(ACTION_CART_IS_NOT_ACTIVE());
    };

    const availabilityHasBeenClicked = () => {
        dispatch(ACTION_AVAILABILITY_PAGE_OPENED());
        if (!availabilityClicked) {
          dispatch(ACTION_AVAILABILITY_CLICKED());
          document.body.style.setProperty("background", "rgb(255, 255, 255)");
        }
      };

    const handleShoppingCartClick = () => {
        if(!selectedStore) return;
        console.log("availability clicked");
        if (props.currentScreenSize === "") {
          if (props.initialScreenSize >= 1200) {
            if (cartIsActive) {
              cartDeactivated();
            } else {
              cartActivated();
              if (!cartPageOpened) {
                dispatch(ACTION_CART_PAGE_OPENED());
              }
            }
          } else {
            cartActivated();
            if (!cartPageOpened) {
              dispatch(ACTION_CART_PAGE_OPENED());
            }
          }
        } else {
          if (props.currentScreenSize >= 1200) {
            if (cartIsActive) {
              cartDeactivated();
            } else {
              cartActivated();
              if (!cartPageOpened) {
                dispatch(ACTION_CART_PAGE_OPENED());
              }
            }
          } else {
            cartActivated();
            if (!cartPageOpened) {
              dispatch(ACTION_CART_PAGE_OPENED());
            }
          }
        }
        availabilityHasBeenClicked();
    };
    
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
            </Box>
            <Box sx={{ mb: 3 }}>
                {!storePageActive &&
                    <Button
                        size="large"
                        variant="contained"
                        onClick={switchNext}
                        disabled={selectedServiceName == ""}
                    >
                        {/* {capitalize(t("form.previous"))} */}
                        <span>Select the store</span>
                        <KeyboardArrowRight />
                    </Button>
                }
                {storePageActive &&
                    <Link
                        to={
                            cartIsActive
                            ? location.pathname
                            : cartPageOpened === "Cart"
                            ? "/availability" // remove cart page
                            : cartPageOpened === "Availability"
                            ? "/availability"
                            : cartPageOpened === "TimePreference"
                            ? "/availability/timepreference"
                            : cartPageOpened === "GuestCheckout"
                            ? "/checkout"
                            : cartPageOpened === "PaymentInfo"
                            ? "/paymentinfo"
                            : cartPageOpened === "ConfirmationPage"
                            ? "/checkout/confirmation"
                            : "/availability"
                        }
                        aria-label="Shopping Cart"
                        onClick={handleShoppingCartClick}
                        style={{textDecoration: "none"}}
                    >
                        <Button
                            size="large"
                            variant="contained"
                            onClick={switchNext}
                            disabled={!selectedStore}
                        >
                            <span>Search for availability</span>
                            <KeyboardArrowRight />
                        </Button>
                    </Link>
                }
            </Box>
        </div>
    );
};

export default Stepper;
