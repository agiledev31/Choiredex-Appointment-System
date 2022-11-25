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
import AdminAddService from "./AdminAddService";
import AdminEditService from "./AdminEditService";
import AdminServiceIndividual from "./AdminServiceIndividual";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import ACTION_LOGIN_IS_NOT_ACTIVE from "../../../actions/Login/ACTION_LOGIN_IS_NOT_ACTIVE";
import ACTION_LOADING_SPINNER_RESET from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_ON_ACTIVITY_PAGE_RESET from "../../../actions/Admin/OnActivityPage/ACTION_ON_ACTIVITY_PAGE_RESET";
import "./AdminService.css";
import "react-html5-camera-photo/build/css/index.css";

const AdminService = (props) => {
  const {
    getEmployeeData,
    currentScreenSize,
    initialScreenSize,
    employeeDataRefetch,
    resetNotifications,
    getAllServicesData,
    getAllServicesRefetch,
    getAllServicesLoading,
    getAllServicesError,
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
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const loginIsActive = useSelector(
    (state) => state.loginIsActive.login_is_active
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
  const [filteredAllServices, changeFilteredAllServices] = useState([]);
  const [serviceFilter, changeServiceFilter] = useState("");
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

  const handleChangeServiceFilter = (e) => {
    changeServiceFilter(e.currentTarget.value);
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
    if (getAllServicesData) {
      if (getAllServicesData.all_services.length > 0) {
        if (changeServiceFilter) {
          changeFilteredAllServices(
            [...getAllServicesData.all_services].filter((x) => {
              return (
                new RegExp(serviceFilter, "gi").test(x.mame ) ||
                new RegExp(serviceFilter, "gi").test(x.description)
              );
            })
          );
        }
      }
    }
  }, [serviceFilter, getAllServicesData]);

  // Allows click only if selected employee modal is not active

  const handleServiceToggled = (e, item) => {
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
          selectedEmployeeBackRef.current.className === e.currentTarget.className ||
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

  // When account screen unmounts, allow navbar
  useEffect(() => {
    if (loginIsActive) {
      dispatch(ACTION_LOGIN_IS_NOT_ACTIVE());
    }
  }, [dispatch, loginIsActive]);

  const renderBarInContactInfo = () => {
    if (!currentScreenSize) {
      if (initialScreenSize >= 1200) {
        return null;
      } else {
        return <p style={{ color: "rgb(200, 200, 200)" }}>|</p>;
      }
    } else {
      if (currentScreenSize >= 1200) {
        return null;
      } else {
        return <p style={{ color: "rgb(200, 200, 200)" }}>|</p>;
      }
    }
  };

  useEffect(() => {
    if (getAllServicesLoading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    } else {
      dispatch(ACTION_LOADING_SPINNER_RESET());
    }
  }, [dispatch, getAllServicesLoading]);

  useEffect(() => {
    if (getAllServicesError) {
      employeeDataRefetch();
    }
  }, [getAllServicesError, employeeDataRefetch]);

  useEffect(() => {
    if (getAllServicesError) {
      getAllServicesRefetch();
    }
  }, [getAllServicesError, getAllServicesRefetch]);

  return (
    <div className="admin_clients_container">
      {redirectToAdminLogInPage()}
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
      <div
        className="admin_clients_header"
        style={{
          zIndex:
            logoutClicked ||
            loadingSpinnerActive ||
            imageLoading ||
            getAllServicesLoading
              ? 0
              : 5,
          filter:
            getAllServicesLoading
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
            onChange={handleChangeServiceFilter}
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
        {getAllServicesData
          ? getAllServicesData.all_services.length > 0
            ? filteredAllServices
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
                          handleServiceToggled(e, item);
                        }
                      }}
                      ref={individualEmployeeRef}
                    >
                      <div className="admin_individual_client_full_name">
                        <p>
                          <b>{item.name}</b>
                        </p>
                        <p>
                          {item.description}
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
                                      logoutClicked ||
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
                                    <AdminServiceIndividual
                                      item={item}
                                      changeEditItem={changeEditItem}
                                      serviceToggled={serviceToggled}
                                      changeServiceToggled={
                                        changeServiceToggled
                                      }
                                      renderBarInContactInfo={
                                        renderBarInContactInfo
                                      }
                                      getAllServicesData={getAllServicesData}
                                      getEmployeeData={getEmployeeData}
                                      getAllServicesRefetch={getAllServicesRefetch}
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
            <AdminAddService
              getAllServicesRefetch={getAllServicesRefetch}
              addServiceClicked={addServiceClicked}
              changeAddServiceClicked={
                changeAddServiceClicked
              }
            />
          ) : null}
          {adminSelected === "edit" ? (
            <AdminEditService
              item={editItem}
              getAllServicesRefetch={getAllServicesRefetch}
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
                    ? logoutClicked ||
                      loadingSpinnerActive ||
                      imageLoading ||
                      addServiceClicked ||
                      serviceToggled
                      ? -1
                      : 0
                    : addServiceClicked
                    ? -1
                    : logoutClicked ||
                      loadingSpinnerActive ||
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
                  Add Service
                </div>
              </div>
            ) : null
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default AdminService;
