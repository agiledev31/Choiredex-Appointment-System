import React, { useMemo, useRef } from "react";
import { Suspense } from "react";
import { Spring } from "react-spring/renderprops";
import { useInView } from "react-intersection-observer";
import "./AllServices.css";

const AllServices = React.forwardRef((props, ref) => {
  const {
    currentScreenSize,
    initialScreenSize,
    Treatments1Ref,
    resetAllCartStates,
    name,
  } = props;

  const servicesHeaderRef = useRef(null);

  // Lazy-loaded Treatments
  // bacial
  const Internet = useMemo(
    () => React.lazy(() => import("../services/Internet/Internet")),
    []
  );
  // clarify
  const Business = useMemo(
    () => React.lazy(() => import("../services/Business/Business")),
    []
  );
  // calm
  const Television = useMemo(
    () => React.lazy(() => import("../services/Television/Television")),
    []
  );

  // glow
  const Mobile = useMemo(
    () => React.lazy(() => import("../services/Mobile/Mobile")),
    []
  );

  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: initialScreenSize >= 1200 ? 0.7 : 0.2,
  });

  return (
    <div className="all_treatments_container" id={name} ref={Treatments1Ref}>
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
      <Suspense fallback={<></>}>
        <Internet
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <Mobile
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <Business
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
        />
      </Suspense>
      <Suspense fallback={<></>}>
        <Television
          initialScreenSize={initialScreenSize}
          currentScreenSize={currentScreenSize}
          resetAllCartStates={resetAllCartStates}
          scrollValue={props.scrollValue}
        />
      </Suspense>
    </div>
  );
});

export default AllServices;
