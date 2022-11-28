import React, { useEffect, useState, useRef } from "react";
import { Transition } from "react-spring/renderprops";
import { faLongArrowAltLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import Modal from "react-modal";
import { css } from "@emotion/css";
import BounceLoader from "react-spinners/BounceLoader";
import phone from "phone";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import updateEmployeeMutation from "../../../graphql/mutations/updateEmployeeMutation";
import Dropdown from "react-dropdown";
import ACTION_ADMIN_STAFF_MEMBER_PHONE_NUMBER from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberPhoneNumber/ACTION_ADMIN_STAFF_MEMBER_PHONE_NUMBER";
import ACTION_ADMIN_STAFF_MEMBER_PHONE_NUMBER_RESET from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberPhoneNumber/ACTION_ADMIN_STAFF_MEMBER_PHONE_NUMBER_RESET";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_ADMIN_STAFF_MEMBER_EMAIL from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberEmail/ACTION_ADMIN_STAFF_MEMBER_EMAIL";
import ACTION_ADMIN_STAFF_MEMBER_EMAIL_RESET from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberEmail/ACTION_ADMIN_STAFF_MEMBER_EMAIL_RESET";
import ACTION_ADMIN_STAFF_MEMBER_LAST_NAME from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberLastName/ACTION_ADMIN_STAFF_MEMBER_LAST_NAME";
import ACTION_ADMIN_STAFF_MEMBER_LAST_NAME_RESET from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberLastName/ACTION_ADMIN_STAFF_MEMBER_LAST_NAME_RESET";
import ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberFirstName/ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME";
import ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME_RESET from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberFirstName/ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME_RESET";
import ACTION_ADMIN_STAFF_MEMBER_ROLES from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberRoles/ACTION_ADMIN_STAFF_MEMBER_ROLES";
import ACTION_ADMIN_STAFF_MEMBER_ROLES_RESET from "../../../actions/Admin/AdminAddStaffMember/AdminStaffMemberRoles/ACTION_ADMIN_STAFF_MEMBER_ROLES_RESET";
import ACTION_LOADING_SPINNER_RESET from "../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import "react-dropdown/style.css";
import "react-day-picker/lib/style.css";
import "./AdminStaff.css";

const AdminEditStaffMember = (props) => {
  const {
    adminSelected,
    changeAdminSelected, 
    getAllRolesData,
    getAllStoresData,
    addStaffMemberClicked,
    getEmployeesRefetch,
  } = props;

  const dispatch = useDispatch();

  const otherRoleRef = useRef(null);

  const adminStaffMemberFirstName = useSelector(
    (state) => state.adminStaffMemberFirstName.admin_staff_member_first_name
  );
  const adminStaffMemberLastName = useSelector(
    (state) => state.adminStaffMemberLastName.admin_staff_member_last_name
  );
  const adminStaffMemberEmail = useSelector(
    (state) => state.adminStaffMemberEmail.admin_staff_member_email
  );
  const adminStaffMemberPhoneNumber = useSelector(
    (state) => state.adminStaffMemberPhoneNumber.admin_staff_member_phone_number
  );
  const adminStaffMemberRoles = useSelector(
    (state) => state.adminStaffMemberRoles.admin_staff_member_roles
  );

  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );

  const [firstName, changeFirstName] = useState(props.item.firstName);
  const [lastName, changeLastName] = useState(props.item.lastName);
  const [email, changeEmail] = useState(props.item.email);
  const [phoneNumber, changePhoneNumber] = useState(props.item.phoneNumber);
  const [storeList, changeStoreList] = useState([props.item.store.name]);
  const [roleList, changeRoleList] = useState(props.item.employeeRole);
  console.log("props", props.item)

  const [otherRoles, changeOtherRoles] = useState([]);
  const [firstFocus, changeFirstFocus] = useState(false);

  // Errors
  const [firstNameError, changeFirstNameError] = useState(false);
  const [lastNameError, changeLastNameError] = useState(false);
  const [emailError, changeEmailError] = useState(false);
  const [phoneNumberError, changePhoneNumberError] = useState(false);
  const [roleError, changeRoleError] = useState(false);
  const [storeError, changeStoreError] = useState(false);

  const [
    updateEmployee,
    { loading: updateEmployeeLoading, data: updateEmployeeData },
  ] = useMutation(updateEmployeeMutation);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  const phoneNumberKeyTyping = (e) => {
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

  const resetAllErrorStates = () => {
    if (firstNameError) {
      changeFirstNameError(false);
    }

    if (lastNameError) {
      changeLastNameError(false);
    }

    if (emailError) {
      changeEmailError(false);
    }

    if (phoneNumberError) {
      changePhoneNumberError(false);
    }

    if (roleError) {
      changeRoleError(false);
    }

    if (storeError) {
      changeStoreError(false);
    }
  };

  const phoneNumberTyping = (e) => {
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
    changePhoneNumber(currentTyping)
  };

  useEffect(() => {
    if (updateEmployeeData && !loadingSpinnerActive) {
      getEmployeesRefetch();
    }
  }, [
    updateEmployeeData,
    loadingSpinnerActive,
    getEmployeesRefetch,
  ]);

  useEffect(() => {
    if (updateEmployeeLoading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    }
  }, [updateEmployeeLoading, dispatch]);

  useEffect(() => {
    if (updateEmployeeData) {
      if (loadingSpinnerActive) {
        dispatch(ACTION_LOADING_SPINNER_RESET());
      }
    }
  }, [updateEmployeeData, loadingSpinnerActive, dispatch]);

  useEffect(() => {
    const refInterval = setInterval(() => {
      if (otherRoleRef) {
        if (otherRoleRef.current && firstFocus) {
          const currentRef = otherRoleRef.current;

          changeFirstFocus(false);
          currentRef.focus();
        }
      }
    }, 500);

    return () => {
      clearInterval(refInterval);
    };
  }, [firstFocus]);

  const handleBackToAllStaff = () => {
    changeOtherRoles([]);
    dispatch(ACTION_ADMIN_STAFF_MEMBER_FIRST_NAME_RESET());
    dispatch(ACTION_ADMIN_STAFF_MEMBER_LAST_NAME_RESET());
    dispatch(ACTION_ADMIN_STAFF_MEMBER_EMAIL_RESET());
    dispatch(ACTION_ADMIN_STAFF_MEMBER_PHONE_NUMBER_RESET());
    dispatch(ACTION_ADMIN_STAFF_MEMBER_ROLES_RESET());
    getEmployeesRefetch();
    changeAdminSelected("");
  };

  const otherRolesValuesArr = otherRoles.map((role) => role.value);

  const otherRolesValuesFiltered = otherRolesValuesArr.filter((role) => role);

  const variablesModel = {
    _id: props.item._id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    employeeRole: roleList,
    store: []
  };

  const handleSubmit = () => {
    if (
      firstName &&
      lastName &&
      email &&
      phoneNumber &&
      roleList.length > 0
    ) {
      let store_temp = getAllStoresData.all_stores.filter(item => storeList.includes(item.name));
      store_temp = store_temp.map(item => {
        return {
          _id: item._id,
          name: item.name,
          address: item.address,
          coordinateLat: item.coordinateLat,
          coordinateLng: item.coordinateLng,
          city: item.city,
          country: item.country,
          phone: item.phone,
          email: item.email,
          website: item.website,
          timezone: item.timezone,
          availableServices: item.availableServices,
        }
      })
      updateEmployee({
        variables: {
          ...variablesModel,
          store: store_temp
        },
      });
      getEmployeesRefetch();
      changeAdminSelected("");
    } else {
      if (!firstName) {
        changeFirstNameError(true);
      }

      if (!lastName) {
        changeLastNameError(true);
      }

      if (!phoneNumber) {
        changePhoneNumberError(true);
      } else {
        if (phone(phoneNumber)[0]) {
          if (!isMobilePhone(phone(phoneNumber)[0])) {
            changePhoneNumberError(true);
          }
        } else {
          changePhoneNumberError(true);
        }
      }

      if (!email) {
        changeEmailError(true);
      } else {
        if (!isEmail(email)) {
          changeEmailError(true);
        }
      }

      if (roleList.concat(otherRolesValuesFiltered).length < 1) {
        changeRoleError(true);
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
                  onClick={handleBackToAllStaff}
                />
                <p onClick={handleBackToAllStaff}>Back to the profile</p>
              </div>
              <div className="admin_create_appointment_section_header">
                <h2>Edit Staff Member Information</h2>
              </div>
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  First Name
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: firstNameError ? "3px solid red" : "none",
                    zIndex: firstNameError ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    value={firstName}
                    onChange={(e) => {
                      resetAllErrorStates();
                      changeFirstName(e.target.value)
                    }}
                    placeholder="Staff member first name"
                  />
                </div>
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Last Name
                </div>
                <div
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-owns="react-autowhatever-1"
                  aria-controls="react-autowhatever-1"
                  aria-expanded="false"
                  className="react-autosuggest__container"
                  style={{
                    outline: lastNameError ? "3px solid red" : "none",
                    zIndex: lastNameError ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    value={lastName}
                    onChange={(e) => {
                      resetAllErrorStates();
                      changeLastName(e.target.value)
                    }}
                    placeholder="Staff member last name"
                  />
                </div>
              </div>
              <div className="admin_create_appointment_input_information_container">
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
                    outline: emailError ? "3px solid red" : "none",
                    zIndex: emailError ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    placeholder="Email address"
                    value={email}
                    maxLength={100}
                    onChange={(e) => {
                      resetAllErrorStates();
                      changeEmail(e.target.value)
                    }}
                  />
                </div>
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
                    outline: phoneNumberError ? "3px solid red" : "none",
                    zIndex: phoneNumberError ? 99999 : "auto",
                  }}
                >
                  <input
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    onKeyDown={phoneNumberKeyTyping}
                    onChange={phoneNumberTyping}
                    maxLength={16}
                    value={phoneNumber}
                    aria-controls="react-autowhatever-1"
                    className="react-autosuggest__input"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              {roleList.length > 0
                ? roleList.map((role, index) => (
                    <div
                      className="admin_create_appointment_input_information_container"
                      key={index}
                    >
                      <div className="admin_create_appointment_label">
                        Role ({index + 1})
                      </div>
                      <div
                        role="combobox"
                        aria-haspopup="listbox"
                        aria-owns="react-autowhatever-1"
                        aria-controls="react-autowhatever-1"
                        aria-expanded="false"
                        className="react-autosuggest__container"
                        style={{
                          outline: roleError ? "3px solid red" : "none",
                          zIndex: roleError ? 99999 : "auto",
                        }}
                      >
                        <input
                          type="text"
                          autoComplete="off"
                          aria-autocomplete="list"
                          aria-controls="react-autowhatever-1"
                          className="react-autosuggest__input admin_create_appointent_dropdown_placeholder_time"
                          value={role}
                          maxLength={100}
                          disabled
                        />
                      </div>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="admin_create_appointment_treatment_delete_button"
                        onClick={() => {
                          let newArr = [...roleList];
                          newArr.splice(index, 1);
                          changeRoleList(newArr)
                          if (newArr.length < 1) {
                            dispatch(ACTION_ADMIN_STAFF_MEMBER_ROLES_RESET());
                          } else {
                            dispatch(ACTION_ADMIN_STAFF_MEMBER_ROLES_RESET());
                            newArr.forEach((item) => {
                              dispatch(ACTION_ADMIN_STAFF_MEMBER_ROLES(item));
                            });
                          }
                        }}
                      />
                    </div>
                  ))
                : null}
              {otherRoles.length > 0
                ? otherRoles.map((role, index) => (
                    <div
                      className="admin_create_appointment_input_information_container"
                      key={index}
                    >
                      <div className="admin_create_appointment_label">
                        Role ({roleList.length + index + 1})
                      </div>
                      <div
                        role="combobox"
                        aria-haspopup="listbox"
                        aria-owns="react-autowhatever-1"
                        aria-controls="react-autowhatever-1"
                        aria-expanded="false"
                        className="react-autosuggest__container"
                        style={{
                          outline: roleError ? "3px solid red" : "none",
                          zIndex: roleError ? 99999 : "auto",
                        }}
                      >
                        <input
                          ref={otherRoleRef}
                          type="text"
                          autoComplete="off"
                          aria-autocomplete="list"
                          aria-controls="react-autowhatever-1"
                          className="react-autosuggest__input"
                          placeholder="Type in staff member role"
                          value={role.value}
                          maxLength={100}
                          onChange={(e) => {
                            resetAllErrorStates();

                            let newArr = [...otherRoles];
                            newArr[index].value = e.target.value;

                            changeOtherRoles(newArr);
                          }}
                        />
                      </div>
                      <FontAwesomeIcon
                        icon={faTimes}
                        onClick={() => {
                          let newArr = [...otherRoles];
                          newArr.splice(index, 1);
                          changeOtherRoles(newArr);
                        }}
                        className="admin_create_appointment_treatment_delete_button"
                      />
                    </div>
                  ))
                : null}
              {roleList.length < 3 ? (
                <div className="admin_create_appointment_input_information_container">
                  <div className="admin_create_appointment_label">Role(s)</div>
                  <Dropdown
                    options={getAllRolesData.all_roles.map(item => item.name)
                      .filter((x) => !roleList.includes(x))}
                    onChange={(choice) => {
                      resetAllErrorStates();
                      changeRoleList([...roleList, choice.value])
                      if (choice.value === "Other") {
                        changeOtherRoles([...otherRoles, { value: "" }]);
                        changeFirstFocus(true);
                      } else {
                        dispatch(ACTION_ADMIN_STAFF_MEMBER_ROLES(choice.value));
                      }
                    }}
                    className="react-autosuggest__container"
                    controlClassName={
                      roleError
                        ? "react-autosuggest__input personal_event_error"
                        : "react-autosuggest__input"
                    }
                    placeholder="Staff member assigned role"
                    placeholderClassName="admin_add_staff_dropdown_placeholder_no_time"
                  />
                </div>
              ) : null}

              {storeList.length > 0
                ? storeList[0]
                  ? storeList.map((store, index) => (
                      <div
                        className="admin_create_appointment_input_information_container"
                        key={index}
                      >
                        <div className="admin_create_appointment_label admin_create_appointment_double_label">
                          Store ({index + 1})
                        </div>
                        <div
                          role="combobox"
                          aria-haspopup="listbox"
                          aria-owns="react-autowhatever-1"
                          aria-controls="react-autowhatever-1"
                          aria-expanded="false"
                          className="react-autosuggest__container"
                          style={{
                            outline: storeError ? "3px solid red" : "none",
                            zIndex: storeError ? 99999 : "auto",
                          }}
                        >
                          <input
                            type="text"
                            autoComplete="off"
                            aria-autocomplete="list"
                            aria-controls="react-autowhatever-1"
                            className="react-autosuggest__input admin_create_appointent_dropdown_placeholder_time"
                            value={store}
                            maxLength={100}
                            disabled
                          />
                        </div>
                        <FontAwesomeIcon
                          icon={faTimes}
                          className="admin_create_appointment_treatment_delete_button"
                          onClick={() => {
                            let newArr = [...storeList];
                            newArr.splice(index, 1);
                            changeStoreList(newArr);
                          }}
                        />
                      </div>
                    ))
                  : null
                : null}
              {!storeList[0] ? (
                <div className="admin_create_appointment_input_information_container">
                  <div className="admin_create_appointment_label admin_create_appointment_double_label">
                    Store(s)
                  </div>
                  <Dropdown
                    options={
                      getAllStoresData.all_stores.map(item => item.name)
                      .filter((x) => !storeList.includes(x))
                    }
                    onChange={(choice) => {
                      resetAllErrorStates();
                      changeStoreList([...storeList, choice.value])
                    }}
                    className="react-autosuggest__container"
                    controlClassName={
                      storeError
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
                    Edit Staff
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

export default AdminEditStaffMember;
