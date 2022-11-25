import React, { useEffect, useState, useRef } from "react";
import { Transition } from "react-spring/renderprops";
import { faLongArrowAltLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import Modal from "react-modal";
import { css } from "@emotion/css";
import BounceLoader from "react-spinners/BounceLoader";
import { phone as isPhone } from "phone";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import Dropdown from "react-dropdown";
import updateStoreMutation from "../../../graphql/mutations/updateStoreMutation";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_LOADING_SPINNER_RESET from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import "react-dropdown/style.css";
import "react-day-picker/lib/style.css";
import "./AdminStore.css";

const AdminEditStoreItem = (props) => {
  const {
    adminSelected,
    changeAdminSelected
  } = props;
  const dispatch = useDispatch();

  const {
    getAllServicesData,
    addServiceClicked,
    changeAddServiceClicked,
    getAllStoresRefetch
  } = props;

  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );

  const [name, changeName] = useState(props.item.name);
  const [address, changeAddress] = useState(props.item.address);
  const [coordinateLat, changeCoordinateLat] = useState(props.item.coordinateLat);
  const [coordinateLng, changeCoordinateLng] = useState(props.item.coordinateLng);
  const [city, changeCity] = useState(props.item.city);
  const [country, changeCountry] = useState(props.item.country);
  const [phone, changePhone] = useState(props.item.phone);
  const [email, changeEmail] = useState(props.item.email);
  const [website, changeWebsite] = useState(props.item.website);
  const [timezone, changeTimezone] = useState(props.item.timezone);
  const [availableServices, changeAvailableServices] = useState(props.item.availableServices);


  // Errors
  const [nameError, changeNameError] = useState(false);
  const [addressError, changeAddressError] = useState(false);
  const [coordinateLatError, changeCoordinateLatError] = useState(false);
  const [coordinateLngError, changeCoordinateLngError] = useState(false);
  const [cityErr, changeCityErr] = useState(false);
  const [countryErr, changeCountryErr] = useState(false);
  const [phoneErr, changePhoneErr] = useState(false);
  const [emailErr, changeEmailErr] = useState(false);
  const [websiteErr, changeWebsiteErr] = useState(false);
  const [timezoneErr, changeTimezoneErr] = useState(false);
  const [availableServicesErr, changeAvailableServicesErr] = useState(false);

  const [
    updateStore,
    { 
      loading: updateStoreLoading, data: updateStoreData },
  ] = useMutation(updateStoreMutation);

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
    if (addressError) {
      changeAddressError(false);
    }
    if (coordinateLatError) {
      changeCoordinateLatError(false);
    }
    if (coordinateLngError) {
      changeCoordinateLngError(false);
    }
    if (cityErr) {
      changeCityErr(false);
    }
    if (countryErr) {
      changeCountryErr(false);
    }
    if (phoneErr) {
      changePhoneErr(false);
    }
    if (emailErr) {
      changeEmailErr(false);
    }
    if (websiteErr) {
      changeWebsiteErr(false);
    }
    if (timezoneErr) {
      changeTimezoneErr(false);
    }
    if (availableServicesErr) {
      changeAvailableServicesErr(false);
    }
  };

  const phoneKeyTyping = (e) => {
    if (
      (e.keyCode >= 8 && e.keyCode < 32) ||
      (e.keyCode >= 37 && e.keyCode <= 40) ||
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      (e.keyCode >= 48 && e.keyCode <= 57)
    ) {
      return e.keyCode;
    } else {
      e.preventDefault();
    }
  };

  const NumberKeyTyping = (e) => {
    if (
      (e.keyCode == 190) ||
      (e.keyCode == 8) ||
      (e.keyCode == 9) ||
      (e.keyCode >= 48 && e.keyCode <= 57)
    ) {
      return e.keyCode;
    } else {
      e.preventDefault();
    }
  };

  const phoneTyping = (e) => {
    let currentTyping = e.currentTarget.value;

    resetAllErrorStates();

    // Formatting for US Phone Numbers
    if (currentTyping.length === 3) {
      currentTyping = currentTyping.split("");
      currentTyping.unshift("(");
      currentTyping.push(") ");

      currentTyping = currentTyping.join("");
    } else {
      if (currentTyping.length === 4) {
        if (
          currentTyping.indexOf("(") === 0 &&
          currentTyping.indexOf(")") < 0
        ) {
          currentTyping = currentTyping.split("");
          currentTyping.splice(currentTyping.indexOf("("), 1);

          currentTyping = currentTyping.join("");
        } else {
          if (
            currentTyping.indexOf("(") < 0 &&
            currentTyping.indexOf(")") < 0
          ) {
            currentTyping = currentTyping.split("");
            currentTyping.unshift("(");
            currentTyping.splice(4, 0, ") ");

            currentTyping = currentTyping.join("");
          }
        }
      } else {
        if (currentTyping.length === 6) {
          if (currentTyping.indexOf(" ") < 0) {
            currentTyping = currentTyping.split("");
            currentTyping.splice(5, 0, " ");

            currentTyping = currentTyping.join("");
          }
        } else {
          if (currentTyping.length === 10) {
            if (currentTyping.lastIndexOf(" ") === 5) {
              currentTyping = currentTyping.split("");
              currentTyping.splice(9, 0, " - ");

              currentTyping = currentTyping.join("");
            } else {
              if (currentTyping.indexOf("(") < 0) {
                currentTyping = currentTyping.split("");
                currentTyping.unshift("(");
                currentTyping.splice(4, 0, ") ");
                currentTyping.splice(8, 0, " - ");
                currentTyping = currentTyping.join("");
              }
            }
          } else {
            if (currentTyping.length === 11) {
              if (
                currentTyping.lastIndexOf(" ") === 9 &&
                currentTyping.indexOf("-") < 0
              ) {
                currentTyping = currentTyping.split("");
                currentTyping.splice(9, 0, " -");

                currentTyping = currentTyping.join("");
              }
            } else {
              if (currentTyping.length === 12) {
                if (currentTyping.lastIndexOf(" ") === 9) {
                  currentTyping = currentTyping.split("");
                  currentTyping.splice(11, 0, " ");

                  currentTyping = currentTyping.join("");
                }
              }
            }
          }
        }
      }
    }
    e.currentTarget.value = currentTyping;
    changePhone(e.target.value);
  };

  useEffect(() => {
    if (updateStoreData && !loadingSpinnerActive) {
      getAllStoresRefetch();
    }
  }, [
    updateStoreData,
    loadingSpinnerActive,
    changeAddServiceClicked,
    getAllStoresRefetch,
  ]);

  useEffect(() => {
    if (updateStoreLoading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    }
  }, [updateStoreLoading, dispatch]);

  useEffect(() => {
    if (updateStoreData) {
      if (loadingSpinnerActive) {
        dispatch(ACTION_LOADING_SPINNER_RESET());
      }
    }
  }, [updateStoreData, loadingSpinnerActive, dispatch]);

  const handleBackToAllStore = () => {
    getAllStoresRefetch();
    changeAdminSelected("");
  };

  const variablesModel = {
    _id: props.item._id,
    name: name,
    address: address,
    coordinateLat: Number(coordinateLat),
    coordinateLng: Number(coordinateLng),
    city: city,
    country: country,
    phone: phone,
    email: email,
    website: website,
    timezone: timezone,
    availableServices: availableServices,
  };

  const handleSubmit = () => {
    if (
      name &&
      coordinateLat &&
      address &&
      coordinateLat &&
      coordinateLng &&
      city &&
      country &&
      phone &&
      email &&
      website &&
      timezone &&
      availableServices.length > 0
    ) {
      updateStore({
        variables: {
          ...variablesModel,
        },
      });
      handleBackToAllStore();
    } else {
      if (!name) {
        changeNameError(true);
      }
      if (!address) {
        changeAddressError(true);
      }
      if (!coordinateLat) {
        changeCoordinateLatError(true);
      }
      if (!coordinateLng) {
        changeCoordinateLngError(true);
      }
      if (!city) {
        changeCityErr(true);
      }
      if (!country) {
        changeCountryErr(true);
      }
      if (!phone) {
        changePhoneErr(true);
      }  else {
        if (isPhone(phone)[0]) {
          if (!isMobilePhone(isPhone(phone)[0])) {
            changePhoneErr(true);
          }
        } else {
          changePhoneErr(true);
        }
      }
      if (!email) {
        changeEmailErr(true);
      } else {
        if (!isEmail(email)) {
          changeEmailErr(true);
        }
      }
      if (!website) {
        changeWebsiteErr(true);
      }
      if (!timezone) {
        changeTimezoneErr(true);
      }
      if (!availableServices) {
        changeAvailableServicesErr(true);
      }
    }
  };

  return (
    <Transition
      items={props.item}
      from={{ transform: "translateX(-100%)" }}
      enter={{ transform: "translateX(0%)" }}
      leave={{ transform: "translateX(-100%)" }}
      config={{ duration: 200 }}
    >
      {(adminSelected) =>
        adminSelected &&
        ((styleprops) => (
          <div
            className="admin_individual_selected_client_container"
            style={{
              ...styleprops,
              zIndex: loadingSpinnerActive ? 0 : 5,
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
                  onClick={handleBackToAllStore}
                />
                <p onClick={handleBackToAllStore}>Back to the store</p>
              </div>
              <div className="admin_create_appointment_section_header">
                <h2>Edit Store Information</h2>
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
                    placeholder="Store Name"
                  />
                </div>
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Address
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: addressError ? "3px solid red" : "none",
                    zIndex: addressError ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    value={address}
                    onChange={(e) => {
                      resetAllErrorStates();
                      changeAddress(e.target.value);
                    }}
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Latitude
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: coordinateLatError ? "3px solid red" : "none",
                    zIndex: coordinateLatError ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    value={coordinateLat}
                    onKeyDown={NumberKeyTyping}
                    onChange={(e) => {
                      resetAllErrorStates();
                      changeCoordinateLat(e.target.value);
                    }}
                    placeholder="Latitude"
                  />
                </div>
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Longitude
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: coordinateLngError ? "3px solid red" : "none",
                    zIndex: coordinateLngError ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    value={coordinateLng}
                    onKeyDown={NumberKeyTyping}
                    onChange={(e) => {
                      resetAllErrorStates();
                      changeCoordinateLng(e.target.value);
                    }}
                    placeholder="Longitude"
                  />
                </div>
              </div>
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  City
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: cityErr ? "3px solid red" : "none",
                    zIndex: cityErr ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    value={city}
                    onChange={(e) => {
                      resetAllErrorStates();
                      changeCity(e.target.value);
                    }}
                    placeholder="City"
                  />
                </div>
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Country
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: countryErr ? "3px solid red" : "none",
                    zIndex: countryErr ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    value={country}
                    onChange={(e) => {
                      resetAllErrorStates();
                      changeCountry(e.target.value);
                    }}
                    placeholder="Country"
                  />
                </div>
              </div>
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Phone
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: phoneErr ? "3px solid red" : "none",
                    zIndex: phoneErr ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    value={phone}
                    onKeyDown={phoneKeyTyping}
                    onChange={phoneTyping}
                    placeholder="Phone Number"
                  />
                </div>
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Email
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: emailErr ? "3px solid red" : "none",
                    zIndex: emailErr ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    value={email}
                    onChange={(e) => {
                      resetAllErrorStates();
                      changeEmail(e.target.value);
                    }}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Website
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: websiteErr ? "3px solid red" : "none",
                    zIndex: websiteErr ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    value={website}
                    onChange={(e) => {
                      resetAllErrorStates();
                      changeWebsite(e.target.value);
                    }}
                    placeholder="Website"
                  />
                </div>
              </div>
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Timezone
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: timezoneErr ? "3px solid red" : "none",
                    zIndex: timezoneErr ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    value={timezone}
                    onChange={(e) => {
                      resetAllErrorStates();
                      changeTimezone(e.target.value);
                    }}
                    placeholder="Timezone"
                  />
                </div>
              </div>

              {availableServices.length > 0
                ? availableServices.map((service, index) => (
                    <div
                      className="admin_create_appointment_input_information_container"
                      key={index}
                    >
                      <div className="admin_create_appointment_label admin_create_appointment_double_label">
                        Service ({index + 1})
                      </div>
                      <div
                        role="combobox"
                        aria-haspopup="listbox"
                        aria-owns="react-autowhatever-1"
                        aria-controls="react-autowhatever-1"
                        aria-expanded="false"
                        className="react-autosuggest__container"
                        style={{
                          outline: availableServicesErr ? "3px solid red" : "none",
                          zIndex: availableServicesErr ? 99999 : "auto",
                        }}
                      >
                        <input
                          type="text"
                          autoComplete="off"
                          aria-autocomplete="list"
                          aria-controls="react-autowhatever-1"
                          className="react-autosuggest__input admin_create_appointent_dropdown_placeholder_time"
                          value={service}
                          maxLength={100}
                          disabled
                        />
                      </div>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="admin_create_appointment_treatment_delete_button"
                        onClick={() => {
                          let newArr = [...availableServices];
                          newArr.splice(index, 1);
                          changeAvailableServices(newArr);
                        }}
                      />
                    </div>
                  ))
                : null}
              {availableServices.length < getAllServicesData.all_services.length ? (
                <div className="admin_create_appointment_input_information_container">
                  <div className="admin_create_appointment_label admin_create_appointment_double_label">
                    Service(s)
                  </div>
                  <Dropdown
                    options={
                      getAllServicesData.all_services.map(item => item.name)
                      .filter((x) => !availableServices.includes(x))
                    }
                    onChange={(choice) => {
                      resetAllErrorStates();
                      changeAvailableServices([...availableServices, choice.value])
                    }}
                    className="react-autosuggest__container"
                    controlClassName={
                      availableServicesErr
                        ? "react-autosuggest__input personal_event_error"
                        : "react-autosuggest__input"
                    }
                    placeholder="Store service"
                    placeholderClassName="admin_add_staff_dropdown_placeholder_no_time"
                  />
                </div>
              ) : null}

              <div className="admin_square_payment_form_container">
                <div className="sq-payment-form">
                  <div className="sq-creditcard" onClick={handleSubmit}>
                    Submit
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

export default AdminEditStoreItem;
