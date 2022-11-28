import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spring, Keyframes } from "react-spring/renderprops";
import { InView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSuitcase,
  faSquare,
  faClock,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import "./ServiceCard.css";
import "./card_styling.css";

const ServiceCard = (props) => {
  const {
    currentScreenSize,
    initialScreenSize,
    item,
    selectedServiceName,
    changeSelectedServiceName,
  } = props;

  const [bookNowButtonHovered, changeBookNowButtonHovered] = useState(false);

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
              currentScreenSize === ""
                ? initialScreenSize >= 1800
                  ? "2rem"
                  : initialScreenSize >= 1400
                  ? "1rem"
                  : initialScreenSize >= 1200
                  ? "1rem"
                  : "100%"
                : currentScreenSize >= 1800
                ? "2rem"
                : currentScreenSize >= 1400
                ? "1rem"
                : currentScreenSize >= 1200
                ? "1rem"
                : "100%"
            }
            height={
              currentScreenSize === ""
                ? initialScreenSize >= 2200
                  ? "2rem"
                  : initialScreenSize >= 1800
                  ? "1.3rem"
                  : initialScreenSize >= 1600
                  ? "1.3rem"
                  : initialScreenSize >= 1200
                  ? "1.1rem"
                  : initialScreenSize >= 360
                  ? "2rem"
                  : "1rem"
                : currentScreenSize >= 2200
                ? "2rem"
                : currentScreenSize >= 1800
                ? "1.3rem"
                : currentScreenSize >= 1600
                ? "1.3rem"
                : currentScreenSize >= 1200
                ? "1.1rem"
                : currentScreenSize >= 360
                ? "2rem"
                : "1rem"
            }
            style={{
              marginTop:
                currentScreenSize === ""
                  ? initialScreenSize >= 2200
                    ? "-0.2rem"
                    : initialScreenSize >= 1800
                    ? "0"
                    : initialScreenSize >= 1600
                    ? "-0.2rem"
                    : initialScreenSize >= 1200
                    ? "-0.1rem"
                    : initialScreenSize >= 360
                    ? "-0.5rem"
                    : "0rem"
                  : currentScreenSize >= 2200
                  ? "-0.2rem"
                  : currentScreenSize >= 1800
                  ? "0"
                  : currentScreenSize >= 1600
                  ? "-0.2rem"
                  : currentScreenSize >= 1200
                  ? "-0.1rem"
                  : currentScreenSize >= 360
                  ? "-0.5rem"
                  : "0rem",
              display: selectedServiceName == item.name ? "block" : "none",
            }}
            viewBox="0 0 13.229 13.229"
          >
            <path
              d="M2.851 7.56l2.45 2.482 5.36-6.958"
              fill="none"
              stroke="#000"
              strokeDasharray="100"
              strokeDashoffset={
                // cartClicked ? (clarifyInCart ? `${styles.x}` : 0) : 0
                selectedServiceName == item.name ? `${styles.x}` : 0
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
  
  const selectService = () => {
    if (selectedServiceName != item.name) {
      changeSelectedServiceName(item.name);
    } else {
      changeSelectedServiceName("");
    }
  };

  const bookButtonBounce = () => {
    return (
      <SuitcaseBounce state="suitcaseBounce">
        {(styles) => (
          <span
            className="fa-layers fa-fw"
            style={
              selectedServiceName != item.name
                ?  styles
                : { position: "relative" }
            }
            onClick={() => selectService()}
          >
            <FontAwesomeIcon
              color={
                selectedServiceName == item.name
                  ? "rgba(119, 221, 119, 0.6)"
                  : selectedServiceName
                  ? "rgba(211, 211, 211, 0.8"
                  : "rgba(0, 129, 177, 0.4)"
              }
              transform={
                !currentScreenSize
                  ? initialScreenSize >= 360
                    ? "grow-20"
                    : "grow-10"
                  : currentScreenSize >= 360
                  ? "grow-20"
                  : "grow-10"
              }
              icon={faSquare}
            />
            {checkMark()}
            <FontAwesomeIcon
              className="small_screen_card_description_suitcase"
              style={{
                display: selectedServiceName == item.name ? "none" : "block",
              }}
              color={
                selectedServiceName != item.name
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
          color: "rgb(0, 129, 177)",
          transition: "ease all 0.5s",
        }}
      >
        <p className="card_toggler">
          {/* {itemToggled ? "SEE DESCRIPTION" : "LEARN MORE"} */}
        </p>
        <span className="card_bottom_spacer" />
        {bookButtonBounce()}
      </div>
    );
  };

  const dynamicScreenSizeBottomCardRender = () => {
    if (currentScreenSize === "") {
      if (initialScreenSize >= 1200) {
        return bigScreenBottomWrapperRender();
      } else {
        return smallScreenBottomWrapperRender();
      }
    } else {
      if (currentScreenSize >= 1200) {
        return bigScreenBottomWrapperRender();
      } else {
        return smallScreenBottomWrapperRender();
      }
    }
  };

  const bigScreenAddToCartButton = () => {
    if (selectedServiceName == item.name) {
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
    <InView threshold={0.2} triggerOnce={true}>
      {({ inView, ref }) => (
        <div className="card_container" ref={ref} onClick={() => selectService()}>
          {inView ? (
            <Spring
              from={{ position: "relative", opacity: 0 }}
              to={{ position: "relative", opacity: 1 }}
              config={{ duration: 1000 }}
            >
              {(styleprops) => (
                <section 
                  className="card" 
                  style={{
                    ...styleprops,
                    cursor: "pointer"
                  }}
                >
                  <div
                    className="card_image"
                    style={{
                      backgroundColor: selectedServiceName == item.name
                        ? "rgba(0, 129, 177, 0.2)"
                        : "rgba(211, 211, 211, 0.4)",
                      boxShadow: selectedServiceName == item.name
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), -3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 3px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <Spring
                      from={{ x: 200, fill: "white" }}
                      to={{ x: 0, fill: "rgb(207, 207, 196, 0.3)" }}
                      config={{ delay: 300, duration: 1500 }}
                    >
                      {(styles) => (
                        <>
                          <div
                            className="big_screen_book_now_wrapper"
                            onClick={() => selectService()}
                            style={{
                              background: bookNowButtonHovered
                                ? selectedServiceName == item.name
                                  ? "rgba(69, 171, 69, 0.6)"
                                  : selectedServiceName
                                  ? "rgb(201, 201, 201)"
                                  : "rgb(0, 129, 177)"
                                : selectedServiceName == item.name
                                ? "rgba(119, 221, 119, 0.6)"
                                : selectedServiceName
                                ? "rgb(201, 201, 201)"
                                : "transparent",
                              border: bookNowButtonHovered
                                ? selectedServiceName == item.name
                                  ? "1px solid rgb(69, 171, 69, 0.8)"
                                  : selectedServiceName
                                  ? "1px solid transparent"
                                  : "1px solid rgb(0, 129, 177)"
                                : selectedServiceName == item.name
                                ? "1px solid rgb(69, 171, 69, 0.8)"
                                : selectedServiceName
                                ? "1px solid transparent"
                                : "1px solid rgb(0, 129, 177)",
                              color: bookNowButtonHovered
                                ? selectedServiceName == item.name
                                  ? "rgb(0, 0, 0)"
                                  : selectedServiceName
                                  ? "rgb(141, 141, 141)"
                                  : "rgb(255, 255, 255)"
                                : selectedServiceName == item.name
                                ? "rgb(0, 0, 0)"
                                : selectedServiceName
                                ? "rgb(141, 141, 141)"
                                : "rgb(0, 129, 177)",
                              cursor: "pointer",
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
                            viewBox="0 0 50.006 50.006"
                            fill="#FABB00"
                          >
                            <circle
                              cx="25"
                              cy="25"
                              r={
                                currentScreenSize === ""
                                  ? initialScreenSize >= 1200
                                    ? "19.5"
                                    : "23"
                                  : currentScreenSize >= 1200
                                  ? "19.5"
                                  : "23"
                              }
                              stroke={
                                selectedServiceName == item.name
                                  ? "rgb(25, 154, 202)"
                                  : "rgba(191, 191, 191)"
                              }
                              strokeWidth="0.5"
                              fill="white"
                            />
                            {item.name.toLowerCase() == "internet"
                              ? (<svg
                                  x="8px" y="10px"
                                  viewBox="0 0 35 35"
                                >
                                  <path x="10" d="m1 9 2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8 3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4 2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"></path>
                                </svg>)
                                : item.name.toLowerCase() == "mobile"
                                  ? (<svg
                                      x="8px" y="8px"
                                      viewBox="0 0 35 35"
                                    >
                                      <path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3zm-2 20h-4v-1h4v1zm3.25-3H6.75V4h10.5v14z"></path>
                                    </svg>)
                                  : item.name.toLowerCase() == "television"
                                    ? (<svg
                                        x="11px" y="13px"
                                        viewBox="0 0 930 930"
                                      >
                                        <g xmlns="http://www.w3.org/2000/svg" transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                                          <path fill="#FABB00" d="M101 4623 c-39 -8 -73 -34 -87 -70 -12 -27 -14 -320 -14 -1734 0 -1491 2 -1705 15 -1733 31 -65 -33 -61 1000 -66 l940 -5 3 -147 3 -146 -150 -4 c-168 -3 -194 -13 -219 -80 -12 -30 -11 -40 1 -71 9 -19 28 -44 43 -54 27 -17 74 -18 955 -18 l928 0 28 21 c15 12 34 37 41 56 12 30 11 40 -1 71 -27 63 -52 72 -217 75 l-145 4 3 149 3 149 895 0 c993 0 946 -3 978 65 14 30 16 206 16 1735 0 1869 4 1745 -58 1787 -26 17 -131 18 -2482 19 -1350 1 -2466 -1 -2479 -3z m4602 -297 c18 -7 42 -26 52 -42 20 -28 20 -58 23 -1304 2 -701 0 -1295 -3 -1319 -5 -32 -16 -54 -40 -78 l-33 -33 -2140 0 -2140 0 -31 26 c-17 14 -35 42 -41 62 -8 26 -10 435 -8 1327 3 1260 3 1291 23 1319 39 59 -101 55 2193 56 1762 0 2118 -2 2145 -14z"/>
                                        </g>
                                      </svg>)
                                    : (<svg
                                      x="8px" y="8px"
                                      viewBox="0 0 35 35"
                                    >
                                      <path d="M10 16v-1H3.01L3 19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4zm10-9h-4.01V5l-2-2h-4l-2 2v2H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0h-4V5h4v2z"></path>                            
                                    </svg>)
                            }
                          </svg>
                        </>
                      )}
                    </Spring>
                    <div
                      className="card_border_right"
                      style={{
                        borderRight: selectedServiceName == item.name
                          ? "1px solid rgba(25, 154, 202, 0.4)"
                          : "1px solid rgb(211, 211, 211)",
                      }}
                    />
                  </div>
                  <div
                    className="card_description"
                    style={{
                      backgroundColor: selectedServiceName == item.name
                        ? "rgba(222, 222, 222, 0.4)"
                        : "rgba(235, 235, 235, 0.2)",
                      boxShadow: selectedServiceName == item.name
                        ? "0px -3px 3px 0px rgba(207, 207, 196, 0.7), 3px 0px 3px 0px rgba(207, 207, 196, 0.7), 0px 4px 3px 0px rgba(207, 207, 196, 0.7)"
                        : "0px -1px 1px 0px rgba(207, 207, 196, 0.1)",
                      transition: "ease all 0.5s",
                    }}
                  >
                    <div className="card_description_inner_wrapper">
                      <h2 style={{ fontWeight: 400 }}>{item.name}</h2>
                      <p
                        className="card_description_subheader"
                        style={{ opacity: 0.7 }}
                      >
                        Services with the {item.name.toLowerCase()}
                      </p>
                      <p className="card_description_paragraph">
                        {item.description}
                      </p>
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

export default ServiceCard;
