import React, { useEffect, useState, useMemo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faSearch,
  faEllipsisH,
  faLongArrowAltLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link, useLocation } from "react-router-dom";
import { FormGroup, Input } from "reactstrap";
import Modal from "react-modal";
import { Transition } from "react-spring/renderprops";
import { css } from "@emotion/css";
import BounceLoader from "react-spinners/BounceLoader";
import AdminAddStore from "./AdminAddStore";
import AdminEditStore from "./AdminEditStore";
import AdminStoreIndividual from "./AdminStoreIndividual";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import ACTION_LOADING_SPINNER_RESET from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_ON_ACTIVITY_PAGE_RESET from "../../../actions/Admin/OnActivityPage/ACTION_ON_ACTIVITY_PAGE_RESET";
import "./AdminStore.css";
import "react-html5-camera-photo/build/css/index.css";

const AdminStore = (props) => {
  const {
    getEmployeeData,
    currentScreenSize,
    initialScreenSize,
    employeeDataRefetch,
    resetNotifications,
    getAllServicesData,
    getAllStoresData,
    getAllStoresRefetch,
    getAllStoresLoading,
    getAllStoresError,
  } = props;

  const dispatch = useDispatch();
  const location = useLocation();

  const selectedEmployeeBackRef = useRef(null);
  const backToClientsRef = useRef(null);
  let individualEmployeeRef = useRef(null);

  const splashScreenHalfway = useSelector(
    (state) => state.splashScreenHalfway.splashScreenHalfway
  );
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const adminAuthenticated = useSelector(
    (state) => state.adminAuthenticated.admin_authenticated
  );

  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );
  const imageLoading = useSelector((state) => state.imageLoading.image_loading);
  const onActivityPage = useSelector(
    (state) => state.onActivityPage.on_activity_page
  );
  const adminNotifications = useSelector(
    (state) => state.adminNotifications.notifications
  );

  const [adminSelected, changeAdminSelected] = useState("");
  const [filteredAllStores, changeFilteredAllStores] = useState([]);
  const [storeFilter, changeStoreFilter] = useState("");
  const [serviceToggled, changeServiceToggled] = useState("");
  const [addServiceClicked, changeAddServiceClicked] = useState(false);
  const [editItem, changeEditItem] = useState("");

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  useEffect(() => {
    if (!splashScreenComplete) {
      dispatch(ACTION_SPLASH_SCREEN_COMPLETE());
    }
    if (!splashScreenHalfway) {
      dispatch(ACTION_SPLASH_SCREEN_HALFWAY());
    }
  }, [dispatch, splashScreenComplete, splashScreenHalfway]);

  const redirectToAdminLogInPage = () => {
    if (!adminAuthenticated) {
      return <Redirect to="/admin" />;
    }
  };

  const handleChangeStoreFilter = (e) => {
    changeStoreFilter(e.currentTarget.value);
  };

  useEffect(() => {
    if (onActivityPage) {
      if (adminNotifications) {
        if (adminNotifications.length > 0) {
          if (adminNotifications.some((item) => item.new)) {
            resetNotifications();
          }
        }
      }
      dispatch(ACTION_ON_ACTIVITY_PAGE_RESET());
    }
  }, [onActivityPage, dispatch, resetNotifications, adminNotifications]);

  const preventKeys = (e) => {
    if (
      e.key === ")" ||
      e.key === "(" ||
      e.key === "[" ||
      e.key === "]" ||
      e.key === "\\" ||
      e.key === "/"
    ) {
      e.preventDefault();
    }
  };

  useMemo(() => {
    if (getAllStoresData) {
      if (getAllStoresData.all_stores.length > 0) {
        if (changeStoreFilter) {
          changeFilteredAllStores(
            [...getAllStoresData.all_stores].filter((x) => {
              return (
                new RegExp(storeFilter, "gi").test(x.name)
              );
            })
          );
        }
      }
    }
  }, [storeFilter, getAllStoresData]);

  // Allows click only if selected employee modal is not active

  const handleserviceToggled = (e, item) => {
    if (e.currentTarget && individualEmployeeRef) {
      if (individualEmployeeRef.current) {
        if (
          individualEmployeeRef.current.className === e.currentTarget.className
        ) {
          if (selectedEmployeeBackRef) {
            if (!selectedEmployeeBackRef.current) {
              if (item) {
                if (item._id) {
                  changeServiceToggled(item._id);
                }
              }
            }
          }
        }
      } else {
        if (
          e.currentTarget.innerText.includes(
            item.name)
        ) {
          if (selectedEmployeeBackRef) {
            if (!selectedEmployeeBackRef.current) {
              if (item) {
                if (item._id) {
                  changeServiceToggled(item._id);
                }
              }
            }
          }
        }
      }
    }
  };

  // Function for back arrow click to reset selected toggled employee

  const handleEmployeeUntoggled = (e) => {
    if (
      (e.currentTarget && selectedEmployeeBackRef) ||
      (e.currentTarget && backToClientsRef)
    ) {
      if (selectedEmployeeBackRef.current || backToClientsRef.current) {
        if (
          selectedEmployeeBackRef.current.className ===
            e.currentTarget.className ||
          backToClientsRef.current.className === e.currentTarget.className
        ) {
          changeServiceToggled("");
        }
      }
    }
  };

  useEffect(() => {
    if (location.pathname || loadingSpinnerActive) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, loadingSpinnerActive]);

  useEffect(() => {
    if (getAllStoresLoading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    } else {
      dispatch(ACTION_LOADING_SPINNER_RESET());
    }
  }, [dispatch, getAllStoresLoading]);

  useEffect(() => {
    if (getAllStoresError) {
      employeeDataRefetch();
    }
  }, [getAllStoresError, employeeDataRefetch]);

  useEffect(() => {
    if (getAllStoresError) {
      getAllStoresRefetch();
    }
  }, [getAllStoresError, getAllStoresRefetch]);

  return (
    <div className="admin_clients_container">
      {redirectToAdminLogInPage()}
      <Modal
        isOpen={imageLoading || loadingSpinnerActive || getAllStoresLoading}
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
          loading={imageLoading || loadingSpinnerActive || getAllStoresLoading}
        />
      </Modal>
      <div
        className="admin_clients_header"
        style={{
          zIndex:
            loadingSpinnerActive ||
            imageLoading ||
            getAllStoresLoading
              ? 0
              : 5,
          filter:
            getAllStoresLoading
              ? "blur(5px)"
              : "none",
        }}
      >
        <Link to="/admin/menu">
          <FontAwesomeIcon
            className="admin_clients_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>SERVICE</h1>
      </div>
      <FormGroup>
        <div className="admin_clients_searchbar_container">
          <Input
            className="admin_clients_searchbar_input_field"
            placeholder="Filter by staff member's name or phone"
            onChange={handleChangeStoreFilter}
            maxLength={128}
            onKeyDown={preventKeys}
          />
          <FontAwesomeIcon
            className="admin_clients_searchbar_icon"
            icon={faSearch}
          />
        </div>
      </FormGroup>
      <div
        className="admin_clients_content_container"
        style={{ height: "55vh", overflow: "auto", marginTop: "2vh" }}
      >
        {getAllStoresData
          ? getAllStoresData.all_stores.length > 0
            ? filteredAllStores
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item, i) => {
                  return (
                    <div
                      className="admin_individual_client_container"
                      key={i}
                      onClick={(e) => {
                        if (addServiceClicked) {
                          return null;
                        } else {
                          handleserviceToggled(e, item);
                        }
                      }}
                      ref={individualEmployeeRef}
                    >
                      <div className="admin_individual_client_full_name">
                        <div>
                          <b>{item.name}</b>
                        </div>
                        <div>
                          <p style={{width: "fit-content"}}>{item.address}</p>
                          <p style={{width: "fit-content"}}>{item.city}, {item.country}</p>
                        </div>
                        <div>
                          <p style={{width: "fit-content"}}>{item.phone}</p>
                          <p style={{width: "fit-content"}}>{item.email}</p>
                        </div>
                        <div>
                          {item.website}
                        </div>
                        <div>
                          {item.availableServices.length > 0
                            ? item.availableServices.map((service, i) => <p key={i} style={{width: "fit-content", color: "rgb(0, 0, 0)"}}>{service} </p>) 
                            : null
                          }
                        </div>
                        <p>
                          
                        </p>
                      </div>
                      {adminSelected === "" ? (
                        <Transition
                          items={serviceToggled}
                          from={{ transform: "translateX(-100%)" }}
                          enter={{ transform: "translateX(0%)" }}
                          leave={{ transform: "translateX(-100%)" }}
                          config={{ duration: 200 }}
                        >
                          {(serviceToggled) =>
                            serviceToggled === item._id &&
                            ((styleprops) => (
                              <div
                                className="admin_individual_selected_client_container"
                                style={{
                                  ...styleprops,
                                  ...{
                                    zIndex:
                                      loadingSpinnerActive ||
                                      imageLoading
                                        ? 0
                                        : 1,
                                  },
                                }}
                              >
                                <div className="admin_individual_selected_client_contents_container">
                                  <div
                                    className="admin_individual_selected_client_back_container"
                                    ref={selectedEmployeeBackRef}
                                    onClick={(e) => handleEmployeeUntoggled(e)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faLongArrowAltLeft}
                                      className="admin_individual_selected_client_back_arrow_icon"
                                    />
                                    <p>
                                        "Back to all services"
                                    </p>
                                  </div>
                                    <AdminStoreIndividual
                                      item={item}
                                      changeEditItem={changeEditItem}
                                      serviceToggled={serviceToggled}
                                      changeServiceToggled={
                                        changeServiceToggled
                                      }
                                      getAllStoresData={getAllStoresData}
                                      getEmployeeData={getEmployeeData}
                                      getAllStoresRefetch={getAllStoresRefetch}
                                      adminSelected={adminSelected}
                                      changeAdminSelected={ changeAdminSelected }
                                    />
                                </div>
                              </div>
                            ))
                          }
                        </Transition>
                      ) : null}
                    </div>
                  );
                })
            : null
          : null}
        {addServiceClicked ? (
          <AdminAddStore
            getAllServicesData={getAllServicesData}
            getAllStoresRefetch={getAllStoresRefetch}
            addServiceClicked={addServiceClicked}
            changeAddServiceClicked={
              changeAddServiceClicked
            }
          />
        ) : null}
        {adminSelected === "edit" ? (
          <AdminEditStore
            item={editItem}
            getAllServicesData={getAllServicesData}
            getAllStoresRefetch={getAllStoresRefetch}
            adminSelected={adminSelected}
            changeAdminSelected={  changeAdminSelected  }
          />
        ) : null}
        {getEmployeeData ? (
          getEmployeeData.employee ? (
            getEmployeeData.employee.employeeRole.includes("Admin") ? (
              <div
                className="add_staff_member_button_container"
                style={{
                  zIndex: serviceToggled
                    ? loadingSpinnerActive ||
                      imageLoading ||
                      addServiceClicked ||
                      serviceToggled
                      ? -1
                      : 0
                    : addServiceClicked
                    ? -1
                    : loadingSpinnerActive ||
                      imageLoading ||
                      addServiceClicked
                    ? 0
                    : 5,
                }}
              >
                <div
                  className="add_staff_member_button"
                  onClick={() => changeAddServiceClicked(true)}
                >
                  Add Store
                </div>
              </div>
            ) : null
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default AdminStore;
