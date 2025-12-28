import React, { useEffect, useState } from "react";
import { Formik } from "formik"; // import Formik from formik
import * as Yup from "yup"; // import Yup from yup
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { closeLoginPopup, loginUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

// create a schema for phone validation (login)
const phoneSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
});

// create a schema for phone validation (signup)
const signupPhoneSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
});

// create a schema for OTP validation (login)
const otpSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  otp: Yup.string()
    .required("OTP is required")
    .length(6, "OTP must be 6 digits")
    .matches(/^[0-9]{6}$/, "OTP must contain only numbers"),
});

// create a schema for OTP validation (signup)
const signupOtpSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  otp: Yup.string()
    .required("OTP is required")
    .length(6, "OTP must be 6 digits")
    .matches(/^[0-9]{6}$/, "OTP must contain only numbers"),
});

const Login = () => {
  console.log("=== Login Component Rendering ===");
  const navigate = useNavigate();
  // call custom hook useLocalStorage for getting localStorage value of user
  const [getLocalStorage, setLocalStorage] = useLocalStorage("user");
  console.log("getLocalStorage:", getLocalStorage);

  const [isSubmit, setIsSubmit] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const dispatch = useDispatch();

  console.log("Login states:", { isSubmit, newUser });
  const closehandler = () => {
    dispatch(closeLoginPopup());
  };
  const handlerLoginClick = () => {
    dispatch(loginUser());
  };

  const handleSendOTP = async (values, { setFieldError }) => {
    console.log("Sending OTP for values:", values);
    try {
      // Here you can add API call to send OTP
      // await sendOTPAPI(values.phone);
      console.log("OTP sent successfully!");
      setIsSubmit(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setFieldError("phone", "Failed to send OTP. Please try again.");
    }
  };

  const handleFormSubmit = async (values, formikBag) => {
    console.log("Form submitted with values:", values);
    console.log("isSubmit state:", isSubmit);

    if (!isSubmit) {
      // First submission - send OTP
      await handleSendOTP(values, formikBag);
    } else {
      // Second submission - login with OTP
      console.log("Processing login with OTP:", values);
      handleNavigate(values);
    }
  };

  // useEffect(() => {
  //   // if length of token is equal to 100 then close popup
  //   if (getLocalStorage?.token?.length === 100) {
  //     dispatch(closeLoginPopup());
  //   }
  // }, [getLocalStorage]);

  // Temporarily commented out to debug rendering issues

  function handleNavigate(values) {
    // Use phone number for name generation or you can ask for name separately
    let name = values?.phone.slice(-4); // Use last 4 digits as identifier

    // generate 100 character random string
    const genRandomStringNthChar = () => {
      return [...Array(100)].map(() => Math.random().toString(36)[2]).join("");
    };

    const userData = {
      userName: values.name || `User${name}`,
      phone: values.phone,
      token: genRandomStringNthChar(),
    };

    // store userName and token in localStorage
    setLocalStorage({
      ...getLocalStorage,
      ...userData,
    });

    // Update Redux state - user is now logged in
    dispatch(loginUser(userData));

    // Close the popup
    dispatch(closeLoginPopup());
  }

  // if length of token is equal to 100 then return null
  // Temporarily commented out to debug rendering issues
  // if (getLocalStorage?.token?.length === 100) return null;

  console.log("About to render Login JSX");

  console.log("About to render Login JSX");

  return (
    <>
      {console.log("Inside Login return statement")}
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={
          !isSubmit
            ? newUser
              ? signupPhoneSchema
              : phoneSchema
            : newUser
              ? signupOtpSchema
              : otpSchema
        }
        initialValues={{
          name: newUser ? "" : undefined,
          phone: "",
          otp: "",
        }}
        enableReinitialize={true}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login-container">
            <div className="login-form">
              {/* Passing handleSubmit parameter to html form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <FontAwesomeIcon
                  className="close-icon"
                  icon={faTimes}
                  onClick={closehandler}
                />
                <span>
                  {newUser ? `Sign up to FoodHunt` : `Log in to FoodHunt`}
                </span>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                {newUser && (
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name || ""}
                    placeholder="Enter your name"
                    className="form-control inp_text"
                    id="name"
                    maxLength="50"
                  />
                )}
                {/* Show name validation errors */}
                {newUser && (
                  <p className="error">
                    {errors.name && touched.name && errors.name}
                  </p>
                )}
                <input
                  type="tel"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  placeholder="Enter your phone number"
                  className="form-control inp_text"
                  id="phone"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.phone && touched.phone && errors.phone}
                </p>
                {/* input with passing formik parameters like handleChange, values, handleBlur to input properties */}

                {isSubmit && (
                  <div className="otp-input-container">
                    <input
                      type="text"
                      name="otp"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.otp}
                      placeholder="Enter 6-digit OTP"
                      className="form-control inp_text"
                      id="otp"
                      maxLength="6"
                    />
                  </div>
                )}
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.otp && touched.otp && errors.otp}
                </p>
                {/* Form submission buttons */}
                <button type="submit">
                  {!isSubmit ? "Send OTP" : newUser ? "Sign Up" : "Login"}
                </button>

                {!newUser && (
                  <p className="signup-text" onClick={() => setNewUser(true)}>
                    Don't have an account? <a>Sign up</a>
                  </p>
                )}
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
