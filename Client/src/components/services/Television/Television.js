import React, { useState, useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spring, animated, Keyframes } from "react-spring/renderprops";
import { InView } from "react-intersection-observer";
import ACTION_CALM_TOGGLE from "../../../actions/Treatments/Calm/ACTION_CALM_TOGGLE";
import ACTION_CALM_TOGGLE_RESET from "../../../actions/Treatments/Calm/ACTION_CALM_TOGGLE_RESET";
import ACTION_CLARIFY_TOGGLE_RESET from "../../../actions/Treatments/Clarify/ACTION_CLARIFY_TOGGLE_RESET";
import ACTION_BACIAL_TOGGLE_RESET from "../../../actions/Treatments/Bacial/ACTION_BACIAL_TOGGLE_RESET";
import ACTION_GLOW_TOGGLE_RESET from "../../../actions/Treatments/Glow/ACTION_GLOW_TOGGLE_RESET";

import ACTION_CALM_IN_CART from "../../../actions/InCart/Treatments/Calm/ACTION_CALM_IN_CART";
import ACTION_CALM_NOT_IN_CART from "../../../actions/InCart/Treatments/Calm/ACTION_CALM_NOT_IN_CART";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faSquare,
  faClock,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

import "./Television.css";
import "../../services/card_styling.css";

const Television = (props) => {

  // "Learn More" states
  const calmToggle = useSelector((state) => state.calmToggle.toggle);
  const clarifyToggle = useSelector((state) => state.clarifyToggle.toggle);
  const bacialToggle = useSelector((state) => state.bacialToggle.toggle);
  const glowToggle = useSelector((state) => state.glowToggle.toggle);
  
  // In Cart states
  const cartIsActive = useSelector((state) => state.cartIsActive.cartIsActive);
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
  const counter = useSelector((state) => state.counterReducer.counter);

  const unsurePopUpTriggered = useSelector(
    (state) => state.unsurePopUpTriggered.unsure_pop_up_triggered
  );

  // Cart States
  const [cartClicked, changeCartClicked] = useState(false);
  const [bookNowButtonHovered, changeBookNowButtonHovered] = useState(false);

  // Pop-Up States
  const [calmClicked, changeCalmClicked] = useState(false);
  const [scrollFreeze, changeScrollFreeze] = useState("");

  const dispatch = useDispatch();

  const handleToggle = () => {
    if (!calmToggle) {
      dispatch(ACTION_CALM_TOGGLE());
      if (clarifyToggle) {
        dispatch(ACTION_CLARIFY_TOGGLE_RESET());
      }
      if (bacialToggle) {
        dispatch(ACTION_BACIAL_TOGGLE_RESET());
      }
      if (glowToggle) {
        dispatch(ACTION_GLOW_TOGGLE_RESET());
      }
    } else {
      dispatch(ACTION_CALM_TOGGLE_RESET());
    }
  };

  const cardDescriptionHandler = () => {
    if (calmToggle) {
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
                <p>50 minutes</p>
              </div>
              <div className="card_description_paragraph_icon_wrapper">
                <FontAwesomeIcon
                  className="card_description_icon"
                  icon={faTag}
                />
                <p className="card_description_paragraph_title">Price</p>
              </div>
              <div className="card_description_paragraph_value">
                <p>$105</p>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <p className="card_description_paragraph">
          Include television plan and other related services
        </p>
      );
    }
  };

  const SuitcaseBounce = Keyframes.Spring({
    suitcaseBounce: [
      {
        marginTop: "0px",
        color: "rgb(45, 38, 27)",
        config: { duration: 100 },
      },
      {
        marginTop: "-9px",
        color: "rgb(45, 38, 27)",
        config: { duration: 300 },
      },
      {
        marginTop: "0px",
        color: "rgb(45, 38, 27)",
        config: { duration: 200 },
      },
      {
        marginTop: "-6",
        color: "rgb(45, 38, 27)",
        config: { duration: 200 },
      },
      {
        marginTop: "0px",
        color: "rgb(45, 38, 27)",
        config: { duration: 200 },
      },
      {
        marginTop: "-4px",
        color: "rgb(45, 38, 27)",
        config: { duration: 200 },
      },
      {
        marginTop: "0px",
        color: "rgb(45, 38, 27)",
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
              display: calmInCart ? "block" : "none",
            }}
            viewBox="0 0 13.229 13.229"
          >
            <path
              d="M2.851 7.56l2.45 2.482 5.36-6.958"
              fill="none"
              stroke="#000"
              strokeDasharray="100"
              strokeDashoffset={
                cartClicked ? (calmInCart ? `${styles.x}` : 0) : 0
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

  const resetStates = props.resetAllCartStates;

  const selectService = () => {
    if (
      !bacialInCart &&
      !clarifyInCart &&
      !glowInCart 
    ){
      if (calmInCart) {
        dispatch(ACTION_CALM_NOT_IN_CART());
        resetStates();
      } else {
        dispatch(ACTION_CALM_IN_CART());
        changeCartClicked(true);
        setTimeout(() => changeCartClicked(false), 200);
      }
    }
  };
  
  const bookButtonBounce = () => {
    return (
      <SuitcaseBounce state="suitcaseBounce">
        {(styles) => (
          <span
            className="fa-layers fa-fw calm_suitcase_wrapping calm_suitcase_selector"
            style={
              calmToggle
                ? calmInCart |
                    bacialInCart |
                    cbdInCart |
                    chemicalPeelInCart |
                    clarifyInCart |
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
            onClick={() => selectService()}
          >
            <FontAwesomeIcon
              color={
                calmToggle
                  ? calmInCart
                    ? "rgba(119, 221, 119, 0.6)"
                    : bacialInCart |
                        cbdInCart |
                        chemicalPeelInCart |
                        clarifyInCart |
                        dermaplaningInCart |
                        glowInCart |
                        microneedleInCart |
                        quenchInCart |
                        quickieInCart |
                        rejuvenateInCart ||
                      unsureInCart ||
                      saltCaveInCart
                    ? "rgba(211, 211, 211, 0.8)"
                    : "rgba(0, 129, 177, 0.4)"
                  : calmInCart
                  ? "rgba(119, 221, 119, 0.6)"
                  : bacialInCart |
                      cbdInCart |
                      chemicalPeelInCart |
                      clarifyInCart |
                      dermaplaningInCart |
                      glowInCart |
                      microneedleInCart |
                      quenchInCart |
                      quickieInCart |
                      rejuvenateInCart ||
                    unsureInCart ||
                    saltCaveInCart
                  ? "rgba(211, 211, 211, 0.8)"
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
              style={{ display: calmInCart ? "none" : "block" }}
              color={
                bacialInCart |
                  cbdInCart |
                  chemicalPeelInCart |
                  clarifyInCart |
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
      </div>
    );
  };

  const smallScreenBottomWrapperRender = () => {
    return (
      <div
        className="card_bottom_wrapper"
        style={{
          color: calmToggle ? "rgb(0, 104, 152)" : "rgb(0, 129, 177)",
          transition: "ease all 0.5s",
        }}
      >
        <p className="card_toggler" onClick={handleToggle}>
          {/* {calmToggle ? "SEE DESCRIPTION" : "LEARN MORE"} */}
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
    if (calmInCart) {
      return (
        <>
          {checkMark()}
          <p className="big_screen_in_cart">SELECTED</p>
        </>
      );
    } else {
      return (
        <>
          <FontAwesomeIcon
            className="big_screen_card_description_suitcase"
            icon={faSuitcase}
          />
          <p>SELECT NOW</p>
        </>
      );
    }
  };

  return (
    <InView
      threshold={0.2}
      triggerOnce={true}
    >
      {({ inView, ref }) => (
        <div className="card_container" ref={ref}  onClick={() => selectService()}>
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
                      backgroundColor: calmInCart
                        ? "rgba(0, 129, 177, 0.2)"
                        : "rgba(211, 211, 211, 0.4)",
                      boxShadow: calmInCart
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), -3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 3px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <Spring
                      from={{ x: 500, fill: "white" }}
                      to={{ x: 0, fill: "rgba(186, 225, 253, 0.7)" }}
                      config={{ delay: 300, duration: 3000 }}
                    >
                      {(styles) => (
                        <>
                          <div
                            className="big_screen_book_now_wrapper"
                            onClick={() => selectService()}
                            style={{
                              background: bookNowButtonHovered
                                ? calmInCart
                                  ? "rgba(69, 171, 69, 0.6)"
                                  : bacialInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      clarifyInCart |
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
                                : calmInCart
                                ? "rgba(119, 221, 119, 0.6)"
                                : bacialInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    clarifyInCart |
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
                                ? calmInCart
                                  ? "1px solid rgb(69, 171, 69, 0.8)"
                                  : bacialInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      clarifyInCart |
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
                                : calmInCart
                                ? "1px solid rgb(69, 171, 69, 0.8)"
                                : bacialInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    clarifyInCart |
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
                                ? calmInCart
                                  ? "rgb(0, 0, 0)"
                                  : bacialInCart |
                                      cbdInCart |
                                      chemicalPeelInCart |
                                      clarifyInCart |
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
                                : calmInCart
                                ? "rgb(0, 0, 0)"
                                : bacialInCart |
                                    cbdInCart |
                                    chemicalPeelInCart |
                                    clarifyInCart |
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
                                  chemicalPeelInCart |
                                  clarifyInCart |
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
                            width="100%"
                            height="15rem"
                            viewBox="0 0 56.356 56.356"
                            className="card_svg"
                            fill="#FABB00"
                          >
                            <circle
                              cx="28"
                              cy="28"
                              r={
                                props.currentScreenSize === ""
                                  ? props.initialScreenSize >= 1200
                                    ? "22"
                                    : "26"
                                  : props.currentScreenSize >= 1200
                                  ? "22"
                                  : "26"
                              }
                              stroke={
                                calmInCart
                                  ? "rgb(25, 154, 202)"
                                  : "rgb(191, 191, 191)"
                              }
                              strokeWidth="0.5"
                              fill="white"
                            />
                            <svg
                              x="13px" y="13px"
                              viewBox="0 0 930 930"
                            >
                              <g xmlns="http://www.w3.org/2000/svg" transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                <path fill="#FABB00" d="M101 4623 c-39 -8 -73 -34 -87 -70 -12 -27 -14 -320 -14 -1734 0 -1491 2 -1705 15 -1733 31 -65 -33 -61 1000 -66 l940 -5 3 -147 3 -146 -150 -4 c-168 -3 -194 -13 -219 -80 -12 -30 -11 -40 1 -71 9 -19 28 -44 43 -54 27 -17 74 -18 955 -18 l928 0 28 21 c15 12 34 37 41 56 12 30 11 40 -1 71 -27 63 -52 72 -217 75 l-145 4 3 149 3 149 895 0 c993 0 946 -3 978 65 14 30 16 206 16 1735 0 1869 4 1745 -58 1787 -26 17 -131 18 -2482 19 -1350 1 -2466 -1 -2479 -3z m4602 -297 c18 -7 42 -26 52 -42 20 -28 20 -58 23 -1304 2 -701 0 -1295 -3 -1319 -5 -32 -16 -54 -40 -78 l-33 -33 -2140 0 -2140 0 -31 26 c-17 14 -35 42 -41 62 -8 26 -10 435 -8 1327 3 1260 3 1291 23 1319 39 59 -101 55 2193 56 1762 0 2118 -2 2145 -14z"/>
                              </g>
                            </svg>
                          </svg>
                        </>
                      )}
                    </Spring>
                    <div
                      className="card_border_right"
                      style={{
                        borderRight: calmInCart
                          ? "1px solid rgba(25, 154, 202, 0.4)"
                          : "1px solid rgb(211, 211, 211)",
                      }}
                    />
                  </div>
                  <div
                    className="card_description"
                    style={{
                      backgroundColor: calmInCart
                        ? "rgba(222, 222, 222, 0.4)"
                        : "rgba(235, 235, 235, 0.3)",
                      boxShadow: calmInCart
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), 3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 4px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <div className="card_description_inner_wrapper">
                      <h2 style={{ fontWeight: 400 }}>TELEVISION</h2>
                      <p
                        className="card_description_subheader"
                        style={{ opacity: 0.7 }}
                      >
                        Services with television
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

export default Television;
