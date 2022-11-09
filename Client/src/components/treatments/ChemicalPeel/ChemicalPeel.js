import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spring, animated, Keyframes } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faClock,
  faTag,
  faSquare,
  faGem,
} from "@fortawesome/free-solid-svg-icons";
import { InView } from "react-intersection-observer";
import ACTION_CHEMICAL_PEEL_TOGGLE from "../../../actions/Treatments/ChemicalPeel/ACTION_CHEMICAL_PEEL_TOGGLE";
import ACTION_CALM_TOGGLE_RESET from "../../../actions/Treatments/Calm/ACTION_CALM_TOGGLE_RESET";
import ACTION_CLARIFY_TOGGLE_RESET from "../../../actions/Treatments/Clarify/ACTION_CLARIFY_TOGGLE_RESET";
import ACTION_BACIAL_TOGGLE_RESET from "../../../actions/Treatments/Bacial/ACTION_BACIAL_TOGGLE_RESET";
import ACTION_GLOW_TOGGLE_RESET from "../../../actions/Treatments/Glow/ACTION_GLOW_TOGGLE_RESET";
import ACTION_REJUVENATE_TOGGLE_RESET from "../../../actions/Treatments/Rejuvenate/ACTION_REJUVENATE_TOGGLE_RESET";
import ACTION_QUENCH_TOGGLE_RESET from "../../../actions/Treatments/Quench/ACTION_QUENCH_TOGGLE_RESET";
import ACTION_QUICKIE_TOGGLE_RESET from "../../../actions/Treatments/Quickie/ACTION_QUICKIE_TOGGLE_RESET";
import ACTION_CHEMICAL_PEEL_TOGGLE_RESET from "../../../actions/Treatments/ChemicalPeel/ACTION_CHEMICAL_PEEL_TOGGLE_RESET";
import ACTION_DERMAPLANING_TOGGLE_RESET from "../../../actions/Treatments/Dermaplaning/ACTION_DERMAPLANING_TOGGLE_RESET";
import ACTION_CBD_TOGGLE_RESET from "../../../actions/Treatments/CBD/ACTION_CBD_TOGGLE_RESET";
import ACTION_MICRONEEDLE_TOGGLE_RESET from "../../../actions/Treatments/Microneedle/ACTION_MICRONEEDLE_TOGGLE_RESET";
import ACTION_CHEM_PEEL_IN_CART from "../../../actions/InCart/Treatments/ChemicalPeel/ACTION_CHEM_PEEL_IN_CART";
import ACTION_CHEM_PEEL_NOT_IN_CART from "../../../actions/InCart/Treatments/ChemicalPeel/ACTION_CHEM_PEEL_NOT_IN_CART";
import ACTION_NAVBAR_IS_VISIBLE from "../../../actions/NavbarIsVisible/ACTION_NAVBAR_IS_VISIBLE";
import ACTION_INCREMENT_COUNTER from "../../../actions/Counter/ACTION_INCREMENT_COUNTER";
import ACTION_DECREMENT_COUNTER from "../../../actions/Counter/ACTION_DECREMENT_COUNTER";
import ACTION_SELECTED_DAY_RESET from "../../../actions/SelectedDay/ACTION_SELECTED_DAY_RESET";
import ACTION_SELECT_TIME_NOT_ACTIVE from "../../../actions/SelectTimeActive/ACTION_SELECT_TIME_NOT_ACTIVE";

// Add-Ons Reset Actions
import ACTION_BEARD_NOT_IN_CART from "../../../actions/InCart/AddOns/Beard/ACTION_BEARD_NOT_IN_CART";
import ACTION_DERMAROLLING_NOT_IN_CART from "../../../actions/InCart/AddOns/Dermarolling/ACTION_DERMAROLLING_NOT_IN_CART";
import ACTION_EXTRACTION_NOT_IN_CART from "../../../actions/InCart/AddOns/ExtraExtractions/ACTION_EXTRACTION_NOT_IN_CART";
import ACTION_GUASHA_NOT_IN_CART from "../../../actions/InCart/AddOns/GuaSha/ACTION_GUASHA_NOT_IN_CART";
import ACTION_HYDROJELLY_NOT_IN_CART from "../../../actions/InCart/AddOns/HydroJellyMask/ACTION_HYDROJELLY_NOT_IN_CART";
import ACTION_LED_NOT_IN_CART from "../../../actions/InCart/AddOns/LEDTherapy/ACTION_LED_NOT_IN_CART";
import ACTION_MICROCURRENT_NOT_IN_CART from "../../../actions/InCart/AddOns/Microcurrent/ACTION_MICROCURRENT_NOT_IN_CART";
import ACTION_MICRODERMABRASION_NOT_IN_CART from "../../../actions/InCart/AddOns/Microdermabrasion/ACTION_MICRODERMABRASION_NOT_IN_CART";
import ACTION_NANONEEDLING_NOT_IN_CART from "../../../actions/InCart/AddOns/NanoNeedling/ACTION_NANONEEDLING_NOT_IN_CART";

import { toast } from "react-toastify";
import ChemicalPeelNotification from "./ChemicalPeelNotification";
import ChemicalPeelRemovedNotification from "./ChemicalPeelRemovedNotification";
import FacialInCartErrorNotification from "../FacialInCartErrorNotification";
import "./ChemicalPeel.css";
import ACTION_SALT_CAVE_TOGGLE_RESET from "../../../actions/Treatments/SaltCave/ACTION_SALT_CAVE_TOGGLE_RESET";
import ACTION_JET_HYDRO_PEEL_TOGGLE_RESET from "../../../actions/Treatments/JetHydroPeel/ACTION_JET_HYDRO_PEEL_TOGGLE_RESET";

const ChemicalPeel = (props) => {
  // "Learn More" states
  const calmToggle = useSelector((state) => state.calmToggle.toggle);
  const clarifyToggle = useSelector((state) => state.clarifyToggle.toggle);
  const bacialToggle = useSelector((state) => state.bacialToggle.toggle);
  const glowToggle = useSelector((state) => state.glowToggle.toggle);
  const rejuvenateToggle = useSelector(
    (state) => state.rejuvenateToggle.toggle
  );
  const quenchToggle = useSelector((state) => state.quenchToggle.toggle);
  const quickieToggle = useSelector((state) => state.quickieToggle.toggle);
  const chemicalpeelToggle = useSelector(
    (state) => state.chemicalpeelToggle.toggle
  );
  const dermaplaningToggle = useSelector(
    (state) => state.dermaplaningToggle.toggle
  );
  const cbdToggle = useSelector((state) => state.cbdToggle.toggle);
  const microneedleToggle = useSelector(
    (state) => state.microneedleToggle.toggle
  );
  const saltCaveToggle = useSelector((state) => state.saltCaveToggle.toggle);
  const jetHydroPeelToggle = useSelector(
    (state) => state.jetHydroPeelToggle.toggle
  );

  // In Cart states
  // Treatments
  const calmInCart = useSelector((state) => state.calmInCart.in_cart);
  const clarifyInCart = useSelector((state) => state.clarifyInCart.in_cart);
  const bacialInCart = useSelector((state) => state.bacialInCart.in_cart);
  const glowInCart = useSelector((state) => state.glowInCart.in_cart);
  const cbdInCart = useSelector((state) => state.cbdInCart.in_cart);
  const chemicalPeelInCart = useSelector(
    (state) => state.chemicalPeelInCart.in_cart
  );
  const dermaplaningInCart = useSelector(
    (state) => state.dermaplaningInCart.in_cart
  );
  const microneedleInCart = useSelector(
    (state) => state.microneedleInCart.in_cart
  );
  const quenchInCart = useSelector((state) => state.quenchInCart.in_cart);
  const quickieInCart = useSelector((state) => state.quickieInCart.in_cart);
  const rejuvenateInCart = useSelector(
    (state) => state.rejuvenateInCart.in_cart
  );
  const unsureInCart = useSelector((state) => state.unsureInCart.in_cart);
  const saltCaveInCart = useSelector((state) => state.saltCaveInCart.in_cart);

  // Add-Ons
  const beardInCart = useSelector((state) => state.beardInCart.in_cart);
  const dermarollingInCart = useSelector(
    (state) => state.dermarollingInCart.in_cart
  );
  const extraExtractionsInCart = useSelector(
    (state) => state.extraExtractionsInCart.in_cart
  );
  const guashaInCart = useSelector((state) => state.guashaInCart.in_cart);
  const hydroJellyInCart = useSelector(
    (state) => state.hydroJellyInCart.in_cart
  );
  const ledInCart = useSelector((state) => state.ledInCart.in_cart);
  const microcurrentInCart = useSelector(
    (state) => state.microcurrentInCart.in_cart
  );
  const microdermabrasionInCart = useSelector(
    (state) => state.microdermabrasionInCart.in_cart
  );
  const nanoneedlingInCart = useSelector(
    (state) => state.nanoneedlingInCart.in_cart
  );

  // Cart States
  const [cartClicked, changeCartClicked] = useState(false);
  const [bookNowButtonHovered, changeBookNowButtonHovered] = useState(false);

  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!chemicalpeelToggle) {
      dispatch(ACTION_CHEMICAL_PEEL_TOGGLE());
      if (calmToggle) {
        dispatch(ACTION_CALM_TOGGLE_RESET());
      }
      if (clarifyToggle) {
        dispatch(ACTION_CLARIFY_TOGGLE_RESET());
      }
      if (bacialToggle) {
        dispatch(ACTION_BACIAL_TOGGLE_RESET());
      }
      if (glowToggle) {
        dispatch(ACTION_GLOW_TOGGLE_RESET());
      }
      if (rejuvenateToggle) {
        dispatch(ACTION_REJUVENATE_TOGGLE_RESET());
      }
      if (quenchToggle) {
        dispatch(ACTION_QUENCH_TOGGLE_RESET());
      }
      if (quickieToggle) {
        dispatch(ACTION_QUICKIE_TOGGLE_RESET());
      }
      if (dermaplaningToggle) {
        dispatch(ACTION_DERMAPLANING_TOGGLE_RESET());
      }
      if (cbdToggle) {
        dispatch(ACTION_CBD_TOGGLE_RESET());
      }
      if (microneedleToggle) {
        dispatch(ACTION_MICRONEEDLE_TOGGLE_RESET());
      }
      if (saltCaveToggle) {
        dispatch(ACTION_SALT_CAVE_TOGGLE_RESET());
      }
      if (jetHydroPeelToggle) {
        dispatch(ACTION_JET_HYDRO_PEEL_TOGGLE_RESET());
      }
    } else {
      dispatch(ACTION_CHEMICAL_PEEL_TOGGLE_RESET());
    }
  };

  const cardDescriptionHandler = () => {
    if (chemicalpeelToggle) {
      return (
        <>
          <div className="card_description_paragraph_toggle">
            <div className="card_description_icon_wrapper_container">
              <div className="card_description_paragraph_icon_wrapper">
                <FontAwesomeIcon
                  className="card_description_icon"
                  icon={faClock}
                />
                <p className="card_description_paragraph_title">Duration</p>
              </div>
              <div className="card_description_paragraph_value">
                <p>30 minutes</p>
              </div>
              <div className="card_description_paragraph_icon_wrapper">
                <FontAwesomeIcon
                  className="card_description_icon"
                  icon={faTag}
                />
                <p className="card_description_paragraph_title">Price</p>
              </div>
              <div className="card_description_paragraph_value">
                <p>$150</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <p className="card_description_paragraph">
          Chemical peels exfoliate and smoothen the texture of skin. They also
          minimize sun damage and pigmentation from acne scarring.
        </p>
      );
    }
  };

  const SuitcaseBounce = Keyframes.Spring({
    suitcaseBounce: [
      {
        marginTop: "0px",
        color: "rgb(155, 98, 107)",
        config: { duration: 100 },
      },
      {
        marginTop: "-9px",
        color: "rgb(155, 98, 107)",
        config: { duration: 300 },
      },
      {
        marginTop: "0px",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 },
      },
      {
        marginTop: "-6",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 },
      },
      {
        marginTop: "0px",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 },
      },
      {
        marginTop: "-4px",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 },
      },
      {
        marginTop: "0px",
        color: "rgb(155, 98, 107)",
        config: { duration: 200 },
      },
    ],
  });

  const checkMark = () => {
    return (
      <Spring from={{ x: 100 }} to={{ x: 0 }} config={{ duration: 2000 }}>
        {(styles) => (
          <svg
            width={
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 1800
                  ? "2rem"
                  : props.initialScreenSize >= 1400
                  ? "1rem"
                  : props.initialScreenSize >= 1200
                  ? "1rem"
                  : "100%"
                : props.currentScreenSize >= 1800
                ? "2rem"
                : props.currentScreenSize >= 1400
                ? "1rem"
                : props.currentScreenSize >= 1200
                ? "1rem"
                : "100%"
            }
            height={
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 2200
                  ? "2rem"
                  : props.initialScreenSize >= 1800
                  ? "1.3rem"
                  : props.initialScreenSize >= 1600
                  ? "1.3rem"
                  : props.initialScreenSize >= 1200
                  ? "1.1rem"
                  : props.initialScreenSize >= 360
                  ? "2rem"
                  : "1rem"
                : props.currentScreenSize >= 2200
                ? "2rem"
                : props.currentScreenSize >= 1800
                ? "1.3rem"
                : props.currentScreenSize >= 1600
                ? "1.3rem"
                : props.currentScreenSize >= 1200
                ? "1.1rem"
                : props.currentScreenSize >= 360
                ? "2rem"
                : "1rem"
            }
            style={{
              marginTop:
                props.currentScreenSize === ""
                  ? props.initialScreenSize >= 2200
                    ? "-0.2rem"
                    : props.initialScreenSize >= 1800
                    ? "0"
                    : props.initialScreenSize >= 1600
                    ? "-0.2rem"
                    : props.initialScreenSize >= 1200
                    ? "-0.1rem"
                    : props.initialScreenSize >= 360
                    ? "-0.5rem"
                    : "0rem"
                  : props.currentScreenSize >= 2200
                  ? "-0.2rem"
                  : props.currentScreenSize >= 1800
                  ? "0"
                  : props.currentScreenSize >= 1600
                  ? "-0.2rem"
                  : props.currentScreenSize >= 1200
                  ? "-0.1rem"
                  : props.currentScreenSize >= 360
                  ? "-0.5rem"
                  : "0rem",
              display: chemicalPeelInCart ? "block" : "none",
            }}
            viewBox="0 0 13.229 13.229"
          >
            <path
              d="M2.851 7.56l2.45 2.482 5.36-6.958"
              fill="none"
              stroke="#000"
              strokeDasharray="100"
              strokeDashoffset={
                cartClicked ? (chemicalPeelInCart ? `${styles.x}` : 0) : 0
              }
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </svg>
        )}
      </Spring>
    );
  };

  const inCartToastId = "facial_already_in_cart";

  const addToCart = () => {
    if (
      calmInCart |
        cbdInCart |
        quickieInCart |
        clarifyInCart |
        dermaplaningInCart |
        bacialInCart |
        microneedleInCart |
        rejuvenateInCart |
        quenchInCart |
        glowInCart ||
      unsureInCart ||
      saltCaveInCart
    ) {
      if (!toast.isActive(inCartToastId)) {
        toast.dismiss();
        toast(
          <FacialInCartErrorNotification
            currentScreenSize={props.currentScreenSize}
            initialScreenSize={props.initialScreenSize}
          />,
          {
            className: "toast_error_container",
            toastId: inCartToastId,
          }
        );
      }
    } else {
      if (chemicalPeelInCart) {
        toast.dismiss();
        dispatch(ACTION_CHEM_PEEL_NOT_IN_CART());
        dispatch(ACTION_DECREMENT_COUNTER());
        dispatch(ACTION_SELECTED_DAY_RESET());
        dispatch(ACTION_SELECT_TIME_NOT_ACTIVE());
        dispatch(ACTION_NAVBAR_IS_VISIBLE());

        props.resetAllCartStates();
        toast(
          <ChemicalPeelRemovedNotification
            currentScreenSize={props.currentScreenSize}
            initialScreenSize={props.initialScreenSize}
          />,
          {
            className: "toast_removed_container",
          }
        );
      } else {
        toast.dismiss();
        dispatch(ACTION_CHEM_PEEL_IN_CART());
        dispatch(ACTION_INCREMENT_COUNTER());
        dispatch(ACTION_NAVBAR_IS_VISIBLE());
        changeCartClicked(true);
        setTimeout(() => changeCartClicked(false), 200);
        toast(
          <ChemicalPeelNotification
            currentScreenSize={props.currentScreenSize}
            initialScreenSize={props.initialScreenSize}
          />,
          { autoClose: 6000 }
        );
        if (beardInCart) {
          dispatch(ACTION_BEARD_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (dermarollingInCart) {
          dispatch(ACTION_DERMAROLLING_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (extraExtractionsInCart) {
          dispatch(ACTION_EXTRACTION_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (guashaInCart) {
          dispatch(ACTION_GUASHA_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (hydroJellyInCart) {
          dispatch(ACTION_HYDROJELLY_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (ledInCart) {
          dispatch(ACTION_LED_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (microcurrentInCart) {
          dispatch(ACTION_MICROCURRENT_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (microdermabrasionInCart) {
          dispatch(ACTION_MICRODERMABRASION_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
        if (nanoneedlingInCart) {
          dispatch(ACTION_NANONEEDLING_NOT_IN_CART());
          dispatch(ACTION_DECREMENT_COUNTER());
        }
      }
    }
  };

  const bookButtonBounce = () => {
    return (
      <SuitcaseBounce state="suitcaseBounce">
        {(styles) => (
          <span
            className="fa-layers fa-fw"
            style={
              chemicalpeelToggle
                ? clarifyInCart |
                    bacialInCart |
                    cbdInCart |
                    chemicalPeelInCart |
                    calmInCart |
                    dermaplaningInCart |
                    glowInCart |
                    microneedleInCart |
                    quenchInCart |
                    quickieInCart |
                    rejuvenateInCart ||
                  unsureInCart ||
                  saltCaveInCart
                  ? { position: "relative" }
                  : styles
                : { position: "relative" }
            }
            onClick={() => addToCart()}
          >
            <FontAwesomeIcon
              color={
                chemicalpeelToggle
                  ? chemicalPeelInCart
                    ? "rgba(119, 221, 119, 0.6)"
                    : bacialInCart |
                        cbdInCart |
                        clarifyInCart |
                        calmInCart |
                        dermaplaningInCart |
                        glowInCart |
                        microneedleInCart |
                        quenchInCart |
                        quickieInCart |
                        rejuvenateInCart ||
                      unsureInCart ||
                      saltCaveInCart
                    ? "rgba(211, 211, 211, 0.8"
                    : "rgba(0, 129, 177, 0.4)"
                  : chemicalPeelInCart
                  ? "rgba(119, 221, 119, 0.6)"
                  : bacialInCart |
                      cbdInCart |
                      clarifyInCart |
                      calmInCart |
                      dermaplaningInCart |
                      glowInCart |
                      microneedleInCart |
                      quenchInCart |
                      quickieInCart |
                      rejuvenateInCart ||
                    unsureInCart ||
                    saltCaveInCart
                  ? "rgba(211, 211, 211, 0.8"
                  : "rgba(0, 129, 177, 0.3)"
              }
              transform={
                !props.currentScreenSize
                  ? props.initialScreenSize >= 360
                    ? "grow-20"
                    : "grow-10"
                  : props.currentScreenSize >= 360
                  ? "grow-20"
                  : "grow-10"
              }
              icon={faSquare}
            />
            {checkMark()}
            <FontAwesomeIcon
              className="small_screen_card_description_suitcase"
              style={{ display: chemicalPeelInCart ? "none" : "block" }}
              color={
                bacialInCart |
                  cbdInCart |
                  clarifyInCart |
                  calmInCart |
                  dermaplaningInCart |
                  glowInCart |
                  microneedleInCart |
                  quenchInCart |
                  quickieInCart |
                  rejuvenateInCart ||
                unsureInCart ||
                saltCaveInCart
                  ? "rgb(151, 151, 151)"
                  : "rgb(0, 129, 177)"
              }
              icon={faSuitcase}
            />
          </span>
        )}
      </SuitcaseBounce>
    );
  };

  const bigScreenBottomWrapperRender = () => {
    return (
      <div className="big_screen_entire_bottom_wrapper">
        <div className="big_screen_price_wrapper">
          <FontAwesomeIcon
            className="big_screen_card_description_icon"
            icon={faTag}
          />
          <p className="big_screen_price">$150</p>
        </div>
        <div className="big_screen_duration_wrapper">
          <FontAwesomeIcon
            className="big_screen_card_description_icon"
            icon={faClock}
          />
          <p className="big_screen_duration">30 minutes</p>
        </div>
      </div>
    );
  };

  const smallScreenBottomWrapperRender = () => {
    return (
      <div
        className="card_bottom_wrapper"
        style={{
          color: chemicalpeelToggle ? "rgb(0, 104, 152)" : "rgb(0, 129, 177)",
          transition: "ease all 0.5s",
        }}
      >
        <p className="card_toggler" onClick={handleToggle}>
          {chemicalpeelToggle ? "SEE DESCRIPTION" : "LEARN MORE"}
        </p>
        <span className="card_bottom_spacer" />
        {bookButtonBounce()}
      </div>
    );
  };

  const dynamicScreenSizeBottomCardRender = () => {
    if (props.currentScreenSize === "") {
      if (props.initialScreenSize >= 1200) {
        return bigScreenBottomWrapperRender();
      } else {
        return smallScreenBottomWrapperRender();
      }
    } else {
      if (props.currentScreenSize >= 1200) {
        return bigScreenBottomWrapperRender();
      } else {
        return smallScreenBottomWrapperRender();
      }
    }
  };

  const bigScreenAddToCartButton = () => {
    if (chemicalPeelInCart) {
      return (
        <>
          {checkMark()}
          <p className="big_screen_in_cart">IN CART</p>
        </>
      );
    } else {
      return (
        <>
          <FontAwesomeIcon
            className="big_screen_card_description_suitcase"
            icon={faSuitcase}
          />
          <p>BOOK NOW</p>
        </>
      );
    }
  };

  return (
    <InView threshold={0.2} triggerOnce={true}>
      {({ inView, ref }) => (
        <div
          className="card_container"
          ref={ref}
          style={{ display: props.saltCaveChemPeelRendered }}
        >
          {inView ? (
            <Spring
              from={{ position: "relative", opacity: 0 }}
              to={{ position: "relative", opacity: 1 }}
              config={{ duration: 1000 }}
            >
              {(styleprops) => (
                <section className="card" style={styleprops}>
                  <div
                    className="card_image"
                    style={{
                      backgroundColor: chemicalpeelToggle
                        ? "rgba(0, 129, 177, 0.2)"
                        : "rgba(211, 211, 211, 0.4)",
                      boxShadow: chemicalpeelToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), -3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 3px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faGem}
                      className="facial_advanced_treatment_icon"
                      style={{
                        color: chemicalpeelToggle
                          ? "rgb(0, 0, 0)"
                          : "rgb(111, 111, 111)",
                      }}
                    />
                    <Spring
                      from={{ x: 300, fill1: "white", fill2: "white" }}
                      to={{
                        x: 0,
                        fill1: "rgba(119, 221, 119, 0.5)",
                        fill2: "rgba(119, 221, 119, 1)",
                      }}
                      config={{ duration: 2000 }}
                    >
                      {(styles) => (
                        <>
                          <div
                            className="big_screen_book_now_wrapper"
                            onClick={() => addToCart()}
                            style={{
                              background: bookNowButtonHovered
                                ? chemicalPeelInCart
                                  ? "rgba(69, 171, 69, 0.6)"
                                  : bacialInCart |
                                      cbdInCart |
                                      clarifyInCart |
                                      calmInCart |
                                      dermaplaningInCart |
                                      glowInCart |
                                      microneedleInCart |
                                      quenchInCart |
                                      quickieInCart |
                                      rejuvenateInCart ||
                                    unsureInCart ||
                                    saltCaveInCart
                                  ? "rgb(201, 201, 201)"
                                  : "rgb(0, 129, 177)"
                                : chemicalPeelInCart
                                ? "rgba(119, 221, 119, 0.6)"
                                : bacialInCart |
                                    cbdInCart |
                                    clarifyInCart |
                                    calmInCart |
                                    dermaplaningInCart |
                                    glowInCart |
                                    microneedleInCart |
                                    quenchInCart |
                                    quickieInCart |
                                    rejuvenateInCart ||
                                  unsureInCart ||
                                  saltCaveInCart
                                ? "rgb(201, 201, 201)"
                                : "transparent",
                              border: bookNowButtonHovered
                                ? chemicalPeelInCart
                                  ? "1px solid rgb(69, 171, 69, 0.8)"
                                  : bacialInCart |
                                      cbdInCart |
                                      clarifyInCart |
                                      calmInCart |
                                      dermaplaningInCart |
                                      glowInCart |
                                      microneedleInCart |
                                      quenchInCart |
                                      quickieInCart |
                                      rejuvenateInCart ||
                                    unsureInCart ||
                                    saltCaveInCart
                                  ? "1px solid transparent"
                                  : "1px solid rgb(0, 129, 177)"
                                : chemicalPeelInCart
                                ? "1px solid rgb(69, 171, 69, 0.8)"
                                : bacialInCart |
                                    cbdInCart |
                                    clarifyInCart |
                                    calmInCart |
                                    dermaplaningInCart |
                                    glowInCart |
                                    microneedleInCart |
                                    quenchInCart |
                                    quickieInCart |
                                    rejuvenateInCart ||
                                  unsureInCart ||
                                  saltCaveInCart
                                ? "1px solid transparent"
                                : "1px solid rgb(0, 129, 177)",
                              color: bookNowButtonHovered
                                ? chemicalPeelInCart
                                  ? "rgb(0, 0, 0)"
                                  : bacialInCart |
                                      cbdInCart |
                                      clarifyInCart |
                                      calmInCart |
                                      dermaplaningInCart |
                                      glowInCart |
                                      microneedleInCart |
                                      quenchInCart |
                                      quickieInCart |
                                      rejuvenateInCart ||
                                    unsureInCart ||
                                    saltCaveInCart
                                  ? "rgb(141, 141, 141)"
                                  : "rgb(255, 255, 255)"
                                : chemicalPeelInCart
                                ? "rgb(0, 0, 0)"
                                : bacialInCart |
                                    cbdInCart |
                                    clarifyInCart |
                                    calmInCart |
                                    dermaplaningInCart |
                                    glowInCart |
                                    microneedleInCart |
                                    quenchInCart |
                                    quickieInCart |
                                    rejuvenateInCart ||
                                  unsureInCart ||
                                  saltCaveInCart
                                ? "rgb(141, 141, 141)"
                                : "rgb(0, 129, 177)",
                              cursor:
                                bacialInCart |
                                  cbdInCart |
                                  clarifyInCart |
                                  calmInCart |
                                  dermaplaningInCart |
                                  glowInCart |
                                  microneedleInCart |
                                  quenchInCart |
                                  quickieInCart |
                                  rejuvenateInCart ||
                                unsureInCart ||
                                saltCaveInCart
                                  ? "auto"
                                  : "pointer",
                              transition: "all 0.5s ease",
                            }}
                            onMouseEnter={() =>
                              changeBookNowButtonHovered(true)
                            }
                            onMouseLeave={() =>
                              changeBookNowButtonHovered(false)
                            }
                          >
                            {bigScreenAddToCartButton()}
                          </div>
                          <svg
                            className="card_svg"
                            width="100%"
                            height="15rem"
                            viewBox="0 0 66.146 66.146"
                          >
                            <circle
                              cx="33.073"
                              cy="33.073"
                              r={
                                props.currentScreenSize === ""
                                  ? props.initialScreenSize >= 1200
                                    ? "26"
                                    : "30"
                                  : props.currentScreenSize >= 1200
                                  ? "26"
                                  : "30"
                              }
                              stroke={
                                chemicalpeelToggle
                                  ? "rgb(25, 154, 202)"
                                  : "rgba(191, 191, 191)"
                              }
                              strokeWidth="0.5"
                              fill="white"
                            />
                            <g
                              fill="none"
                              stroke="#000"
                              strokeWidth="1"
                              transform="translate(19, 16)"
                            >
                              <animated.path
                                strokeDasharray="300"
                                strokeDashoffset={`${styles.x}`}
                                className="chemical_peel_icon_path"
                                d="M20.237 59.11c5.847-.017 17.541-.05 23.782-.201 6.24-.152 7.028-.42 7.682-.84s1.172-.99 1.49-1.46.436-.84.52-1.193c.084-.353.134-.689.092-1.092-.042-.402-.176-.873-.393-1.444s-.52-1.242-2.916-5.624c-2.395-4.383-6.886-12.476-9.19-16.735-2.304-4.26-2.42-4.675-2.537-5.094-.017-5.592-.034-11.183.013-14.073s.17-3.105.296-3.323c.126-.218.26-.453.386-.73.125-.277.243-.596.276-.932a2.436 2.436 0 00-.092-.924.793.793 0 00-.318-.453c-.143-.1-.327-.185-2.572-.227-2.246-.042-6.55-.042-8.787-.033-2.237.008-2.405.025-2.555.075s-.285.135-.386.286-.167.37-.2.621c-.034.252-.034.504.007.77s.126.54.218.75c.092.21.193.36.294.52.1.16.2.328.284 3.317.084 2.989.151 8.798.218 14.608-4.858 9-9.717 18-12.205 22.828-2.488 4.827-2.605 5.482-2.588 6.078.016.596.167 1.134.385 1.646s.503.999.78 1.36c.276.361.544.596.946.848s.938.52 1.164.638c.226.118.142.084.1.067-.041-.017-.041-.017 5.806-.033z"
                              />
                              <animated.path
                                fill={`${styles.fill1}`}
                                strokeDasharray="275"
                                strokeDashoffset={`${styles.x}`}
                                className="chemical_peel_icon_path"
                                d="M34.085 11.72c0 2.734 0 8.201.024 10.98.023 2.778.07 2.867.127 2.939.056.07.121.124.17.164.05.04.076.061.132.082.056.02.14.039.22.05.08.012.156.018.245.012a.824.824 0 00.282-.065.864.864 0 00.248-.18.843.843 0 00.175-.238c.036-.08.041-.158.039-2.904-.003-2.746-.015-8.171-.036-10.917-.02-2.745-.05-2.817-.095-2.888a1.046 1.046 0 00-.16-.196.529.529 0 00-.186-.118 1.2 1.2 0 00-.563-.063.615.615 0 00-.213.083.927.927 0 00-.178.134.643.643 0 00-.113.16c-.035.066-.077.149-.097.19-.021.042-.021.042-.021 2.776zM25.482 33.66c.184.06.55.178.9.285.35.107.682.202 1.043.273.361.071.752.119 1.125.137s.729.006 1.072-.012a5.644 5.644 0 001.12-.149 13.416 13.416 0 001.487-.48c.485-.185.9-.363 1.285-.565.385-.201.74-.427 1.06-.623.32-.196.605-.362.868-.518.263-.156.495-.295.803-.432.308-.136.687-.267.96-.344.272-.077.438-.101.615-.09.178.013.368.06.522.143.154.083.272.202.408.362.137.16.29.362 2.086 3.752 1.794 3.39 5.23 9.968 6.989 13.387 1.76 3.42 1.842 3.681 1.901 3.907.06.225.095.415.125.653.03.237.053.522.023.783-.03.262-.112.499-.177.695-.065.196-.113.35-.196.505a2.325 2.325 0 01-.337.457c-.137.148-.29.29-.45.415-.16.125-.326.232-.516.35-.19.12-.403.25-.675.363-.273.112-.604.207-.83.273-.224.065-.343.1-.58.119-.237.017-.592.017-5.213.017s-13.505 0-18.048-.035-4.745-.107-4.97-.19a6.317 6.317 0 01-.681-.285 3.644 3.644 0 01-.58-.386c-.208-.16-.457-.362-.67-.594s-.391-.493-.533-.777-.25-.594-.302-.909a4.843 4.843 0 01-.048-.908c.006-.273.018-.499.065-.712s.13-.416.208-.6c.077-.184.148-.35 1.806-3.4 1.657-3.05 4.905-8.99 6.528-11.958 1.623-2.969 1.623-2.968 1.807-2.91z"
                              />
                              <animated.path
                                fill={`${styles.fill2}`}
                                strokeDasharray="152"
                                strokeDashoffset={`${styles.x}`}
                                className="chemical_peel_icon_path"
                                d="M27.597 44.13c-.05.056-.151.17-.228.29-.077.123-.13.253-.193.387-.062.133-.133.27-.183.4-.05.131-.08.256-.098.392s-.024.285-.035.443-.03.323-.012.52c.017.195.07.42.103.569.033.148.045.22.092.332.048.113.13.268.231.419a4.425 4.425 0 00.687.793c.125.106.26.201.403.287a2.364 2.364 0 00.758.323c.095.025.172.042.246.06.074.018.145.036.273.05s.31.027.465.027a2.3 2.3 0 00.4-.032c.12-.021.24-.05.352-.083a3.13 3.13 0 00.742-.323 3.544 3.544 0 00.84-.728c.112-.14.2-.282.29-.43.088-.149.177-.303.248-.5.071-.195.125-.433.16-.667.036-.235.054-.466.034-.716-.02-.25-.081-.528-.153-.74a2.3 2.3 0 00-.245-.506 3.997 3.997 0 00-.302-.43c-.11-.134-.228-.253-.347-.363s-.237-.21-.376-.3c-.139-.089-.299-.166-.442-.235a3.805 3.805 0 00-.41-.177 2.952 2.952 0 00-.45-.116c-.14-.024-.253-.03-.362-.035-.11-.006-.216-.012-.326-.012s-.222.006-.352.03c-.13.023-.279.065-.4.106a2.402 2.402 0 00-.311.13c-.095.048-.19.102-.267.137-.077.036-.136.054-.123.02s.106-.126.168-.233c.062-.107.097-.232.124-.371.027-.14.044-.294.047-.449a1.794 1.794 0 00-.04-.44 1.381 1.381 0 00-.15-.358 3.525 3.525 0 00-.2-.312 1.982 1.982 0 00-.213-.256c-.078-.079-.164-.147-.242-.21-.079-.064-.14-.115-.215-.154a.933.933 0 00-.243-.08 3.776 3.776 0 00-.263-.042 2.674 2.674 0 00-.27-.027c-.092-.003-.186.003-.29.015s-.216.03-.332.075c-.115.044-.234.115-.34.175-.107.059-.202.106-.285.175a1.153 1.153 0 00-.219.255 3.554 3.554 0 00-.284.534c-.03.08-.054.17-.083.282a2.85 2.85 0 00-.08.374.94.94 0 00.018.342c.026.115.074.24.124.35.05.11.104.205.148.29.045.087.08.164.145.241.065.077.16.155.252.229.092.074.18.145.273.205.091.059.186.106.284.14.098.032.198.05.284.064.086.015.157.027.249.036a1.596 1.596 0 00.613-.048c.071-.02.1-.038.154-.068.053-.03.13-.071.169-.092.038-.02.038-.02-.012.036zM34.204 37.97l.172-.128a1.52 1.52 0 01.186-.121.813.813 0 01.382-.095c.06-.003.113-.003.17 0a.77.77 0 01.183.026.617.617 0 01.157.084c.053.035.112.077.175.121.062.045.127.092.177.146a.79.79 0 01.125.187 1.5 1.5 0 01.106.252c.027.089.039.178.042.243a.6.6 0 01-.012.155 2.74 2.74 0 01-.121.407.676.676 0 01-.101.183.666.666 0 01-.154.131c-.06.039-.125.074-.178.104-.053.03-.095.053-.157.08a.941.941 0 01-.228.068.862.862 0 01-.26-.009 1.366 1.366 0 01-.297-.077.878.878 0 01-.252-.157 1.046 1.046 0 01-.297-.448c-.033-.086-.067-.175-.085-.276s-.017-.208-.003-.3a.946.946 0 01.086-.258c.042-.09.095-.19.122-.24.026-.051.026-.051.062-.078z"
                              />
                            </g>
                          </svg>
                        </>
                      )}
                    </Spring>
                    <p
                      className="facial_advanced_treatment_designation"
                      style={{
                        color: chemicalpeelToggle
                          ? "rgb(0, 0, 0)"
                          : "rgb(111, 111, 111)",
                      }}
                    >
                      Advanced Treatment
                    </p>
                    <div
                      className="card_border_right"
                      style={{
                        borderRight: chemicalpeelToggle
                          ? "1px solid rgba(25, 154, 202, 0.4)"
                          : "1px solid rgb(211, 211, 211)",
                      }}
                    />
                  </div>
                  <div
                    className="card_description"
                    style={{
                      backgroundColor: chemicalpeelToggle
                        ? "rgba(222, 222, 222, 0.4)"
                        : "rgba(235, 235, 235, 0.2)",
                      boxShadow: chemicalpeelToggle
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), 3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 4px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <div className="card_description_inner_wrapper">
                      <h2 style={{ fontWeight: 400 }}>CHEMICAL PEEL</h2>
                      <p
                        className="card_description_subheader"
                        style={{ opacity: 0.6 }}
                      >
                        Resurfacing
                      </p>
                      {cardDescriptionHandler()}
                      {dynamicScreenSizeBottomCardRender()}
                    </div>
                  </div>
                </section>
              )}
            </Spring>
          ) : null}
        </div>
      )}
    </InView>
  );
};

export default ChemicalPeel;
