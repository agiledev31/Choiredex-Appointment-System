import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faTimes,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import BounceLoader from "react-spinners/BounceLoader";
import { Transition } from "react-spring/renderprops";
import { css } from "@emotion/css";
import deleteStoreMutation from "../../../graphql/mutations/deleteStoreMutation";
import { useMutation } from "@apollo/react-hooks";
import { useCallback } from "react";
import ACTION_LOADING_SPINNER_RESET from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";

const AdminStoreIndividual = (props) => {
  const dispatch = useDispatch();
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );

  const [deleteServiceClicked, changeDeleteServiceClicked] = useState(false);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  const [deleteStore, { loading, data }] = useMutation(
    deleteStoreMutation
  );

  const handleDeleteService = (item) => {
    deleteStore({
      variables: { _id: item },
    });

    if (deleteServiceClicked) {
      changeDeleteServiceClicked(false);
    }
  };

  const resetStatesAfterLoading = useCallback(() => {
    props.getAllStoresRefetch();
    dispatch(ACTION_LOADING_SPINNER_RESET());
    props.changeServiceToggled("");
  }, [props, dispatch]);

  useEffect(() => {
    if (data) {
      const loadingFunction = setTimeout(() => resetStatesAfterLoading(), 2000);
      return () => {
        clearTimeout(loadingFunction);
      };
    }
  }, [data, resetStatesAfterLoading]);

  useEffect(() => {
    if (loading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    }
  }, [loading, data, dispatch]);

  const handleEditServiceClicked = () => {
    props.changeEditItem(props.item)
    props.changeAdminSelected("edit");
  }

  return (
    <>
      <Modal
        isOpen={deleteServiceClicked}
        className="cancel_appointment_modal"
        style={{
          content: {
            position: "fixed",
            zIndex: 10000,
            opacity: 0.99,
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
          loading={loadingSpinnerActive}
        />
        <Transition
          items={deleteServiceClicked && !loadingSpinnerActive}
          from={{ transform: "translate3d(0, -65%, 0)" }}
          enter={{ transform: "translate3d(0, 0, 0)" }}
          leave={{ display: "none" }}
        >
          {(serviceToggled) =>
            serviceToggled &&
            ((styleprops) => (
              <div
                className="cancel_appointment_modal_content_container"
                style={styleprops}
              >
                <div className="log_out_modal_contents admin_cancel_appointment">
                  <FontAwesomeIcon
                    className="modal_x"
                    icon={faTimes}
                    onClick={() => changeDeleteServiceClicked(false)}
                  />
                  <h2>
                    Are you sure you want to remove{" "}
                    {props.item.name}{" "}
                    as a service?
                  </h2>
                  <span className="logout_buttons_container">
                    <div
                      className="logout_button yes_cancel_appointment_button"
                      onClick={() =>
                        handleDeleteService(props.serviceToggled)
                      }
                    >
                      <p>YES, REMOVE</p>
                    </div>
                    <div
                      className="cancel_logout_button no_dont_cancel_appointment_button"
                      onClick={() => changeDeleteServiceClicked(false)}
                    >
                      <p>NO, GO BACK</p>
                    </div>
                  </span>
                </div>
              </div>
            ))
          }
        </Transition>
      </Modal>
      <div 
        className="admin_client_profile_top_section"
        style={{minHeight: "150px"}}
      >
        <div className="admin_individual_selected_client_full_name_container">
          <h2>
            {props.item.name}
          </h2>
        </div>
        <div className="admin_individual_selected_client_contact_info_container">
          <p>{props.item.description}</p>
        </div>
      </div>
      <div className="admin_client_profile_bottom_buttons_container">
        <div
          className="profile_button_container"
          onClick={() => handleEditServiceClicked()}
        >
          <FontAwesomeIcon
            className="profile_button_icon"
            icon={faEdit}
          />
          <h2>
            Edit Service
          </h2>
        </div>
      </div>
      <div className="admin_client_profile_bottom_buttons_container">
        {props.getEmployeeData ? (
          props.getEmployeeData.employee ? (
            props.getEmployeeData.employee.employeeRole.includes("Admin") &&
            props.getEmployeeData.employee._id !== props.serviceToggled ? (
              <div
                className="profile_button_container"
                onClick={() => changeDeleteServiceClicked(true)}
              >
                <FontAwesomeIcon
                  className="profile_button_icon"
                  icon={faTrashAlt}
                  style={{ color: "rgb(177, 48, 0)" }}
                />
                <h2 style={{ color: "rgb(177, 48, 0)" }}>
                  Delete Service
                </h2>
              </div>
            ) : null
          ) : null
        ) : null}
      </div>
    </>
  );
};

export default AdminStoreIndividual;
