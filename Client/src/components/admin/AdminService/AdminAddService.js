import React, { useEffect, useState, useRef } from "react";
import { Transition } from "react-spring/renderprops";
import { faLongArrowAltLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import Modal from "react-modal";
import { css } from "@emotion/css";
import BounceLoader from "react-spinners/BounceLoader";
import addServiceMutation from "../../../graphql/mutations/addServiceMutation";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_LOADING_SPINNER_RESET from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import "react-dropdown/style.css";
import "react-day-picker/lib/style.css";
import "./AdminService.css";

const AdminAddServiceItem = (props) => {
  const dispatch = useDispatch();

  const {
    addServiceClicked,
    changeAddServiceClicked,
    getAllServicesRefetch
  } = props;

  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );

  const [name, changeName] = useState("");
  const [description, changeDescription] = useState("");

  // Errors
  const [nameError, changeNameError] = useState(false);
  const [descriptionError, changeDescriptionError] = useState(false);


  const [
    addService,
    { 
      loading: addServiceLoading, data: addServiceData },
  ] = useMutation(addServiceMutation);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  const resetAllErrorStates = () => {
    if (nameError) {
      changeNameError(false);
    }

    if (descriptionError) {
      changeDescriptionError(false);
    }
  };

  useEffect(() => {
    if (addServiceData && !loadingSpinnerActive) {
      changeAddServiceClicked(false);
      getAllServicesRefetch();
    }
  }, [
    addServiceData,
    loadingSpinnerActive,
    changeAddServiceClicked,
    getAllServicesRefetch,
  ]);

  useEffect(() => {
    if (addServiceLoading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    }
  }, [addServiceLoading, dispatch]);

  useEffect(() => {
    if (addServiceData) {
      if (loadingSpinnerActive) {
        dispatch(ACTION_LOADING_SPINNER_RESET());
      }
    }
  }, [addServiceData, loadingSpinnerActive, dispatch]);

  const handleBackToAllService = () => {
    changeAddServiceClicked(false);
    changeName("");
    changeDescription("");
  };
  const variablesModel = {
    name: name,
    description: description,
    duration: 30
  };

  const handleSubmit = () => {
    if (
      name &&
      description
    ) {
      addService({
        variables: {
          ...variablesModel,
        },
      });
    } else {
      if (!name) {
        changeNameError(true);
      }

      if (!description) {
        changeDescriptionError(true);
      }
    }
  };

  return (
    <Transition
      items={addServiceClicked}
      from={{ transform: "translateX(-100%)" }}
      enter={{ transform: "translateX(0%)" }}
      leave={{ transform: "translateX(-100%)" }}
      config={{ duration: 200 }}
    >
      {(addServiceClicked) =>
        addServiceClicked &&
        ((styleprops) => (
          <div
            className="admin_individual_selected_client_container"
            style={{
              ...styleprops,
              zIndex: logoutClicked || loadingSpinnerActive ? 0 : 5,
            }}
          >
            <Modal
              isOpen={loadingSpinnerActive}
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
                loading={loadingSpinnerActive}
              />
            </Modal>
            <div className="admin_individual_selected_employee_contents">
              <div className="admin_individual_selected_client_back_container">
                <FontAwesomeIcon
                  icon={faLongArrowAltLeft}
                  className="admin_individual_selected_client_back_arrow_icon"
                  onClick={handleBackToAllService}
                />
                <p onClick={handleBackToAllService}>Back to all service</p>
              </div>
              <div className="admin_create_appointment_section_header">
                <h2>New Service Information</h2>
              </div>
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Name
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: nameError ? "3px solid red" : "none",
                    zIndex: nameError ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    value={name}
                    onChange={(e) => {
                      resetAllErrorStates();
                      changeName(e.target.value);
                    }}
                    placeholder="Service Name"
                  />
                </div>
              </div>
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Description
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: descriptionError ? "3px solid red" : "none",
                    zIndex: descriptionError ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    value={description}
                    onChange={(e) => {
                      resetAllErrorStates();
                      changeDescription(e.target.value);
                    }}
                    placeholder="Service Description"
                  />
                </div>
              </div>

              <div className="admin_square_payment_form_container">
                <div className="sq-payment-form">
                  <div className="sq-creditcard" onClick={handleSubmit}>
                    Add Service
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </Transition>
  );
};

export default AdminAddServiceItem;
