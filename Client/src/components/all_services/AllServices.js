import React, { useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Suspense } from "react";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import Modal from "react-modal";
import { css } from "@emotion/css";
import BounceLoader from "react-spinners/BounceLoader";
import ACTION_LOADING_SPINNER_RESET from "../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import ACTION_LOADING_SPINNER_ACTIVE from "../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import "./AllServices.css";

const AllServices = React.forwardRef((props, ref) => {
  const {
    currentScreenSize,
    initialScreenSize,
    Treatments1Ref,
    resetAllCartStates,
    name,
    getAllServicesData,
    getAllServicesRefetch,
    getAllServicesLoading,
    getAllServicesError,
    selectedServiceName,
    changeSelectedServiceName,
  } = props;

  const dispatch = useDispatch();

  const servicesHeaderRef = useRef(null);

  // Lazy-loaded Treatments
  const ServiceCard = useMemo(
    () => React.lazy(() => import("./ServiceCard")),
    []
  );

  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );
  const imageLoading = useSelector((state) => state.imageLoading.image_loading);

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: initialScreenSize >= 1200 ? 0.7 : 0.2,
  });

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  useEffect(() => {
    if (getAllServicesLoading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    } else {
      dispatch(ACTION_LOADING_SPINNER_RESET());
    }
  }, [dispatch, getAllServicesLoading]);

  useEffect(() => {
    if (getAllServicesError) {
      getAllServicesRefetch();
    }
  }, [getAllServicesError, getAllServicesRefetch]);

  return (
    <div className="all_treatments_container" id={name} ref={Treatments1Ref}>
      <Modal
        isOpen={imageLoading || loadingSpinnerActive || getAllServicesLoading}
        style={{
          content: {
            position: "fixed",
            zIndex: "10000",
            height: "100%",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            paddingBottom: "10%",
            borderRadius: "none",
            width: "100vw",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <BounceLoader
          size={100}
          css={override}
          color={"rgb(44, 44, 52)"}
          loading={imageLoading || loadingSpinnerActive || getAllServicesLoading}
        />
      </Modal>
      <header className="all_treatments_header" ref={inViewRef}>
        {inView ? (
          <Spring
            from={{
              position: "relative",
              opacity: 0,
            }}
            to={{
              position: "relative",
              opacity: 1,
            }}
            config={{ duration: 1000 }}
          >
            {(styles) => (
              <>
                <h2
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                  }}
                  ref={servicesHeaderRef}
                >
                  Welcome
                </h2>
                <span
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                    width: servicesHeaderRef.current
                      ? servicesHeaderRef.current.clientWidth + "px"
                      : "0px",
                  }}
                  className="treatments_title_underline"
                />
                <br />
                <h3
                  style={{
                    position: `${styles.position}`,
                    opacity: `${styles.opacity}`,
                  }}
                >
                  <p>
                    Welcome, <br />
                    to schedule your reservation. <br />
                    Please select the service <br />
                    you need today.
                  </p>
                </h3>
              </>
            )}
          </Spring>
        ) : null}
      </header>
      {getAllServicesData
        ? getAllServicesData.all_services.length > 0
            ? getAllServicesData.all_services.sort((a, b) => a.name.localeCompare(b.name))
              .map((item, i) => {
                return (
                  <Suspense key={i} fallback={<></>}>
                    <ServiceCard
                      item={item}
                      selectedServiceName={selectedServiceName}
                      changeSelectedServiceName={changeSelectedServiceName}
                      initialScreenSize={initialScreenSize}
                      currentScreenSize={currentScreenSize}
                      resetAllCartStates={resetAllCartStates}
                    />
                  </Suspense>
                )
              })
          : null
        : null
      }
    </div>
  );
});

export default AllServices;
