import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "Pages/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import axiosHelper from '../../../Utilities/axiosHelper';
import { useAuth } from '../../../components/AuthContext';
import { API_ENDPOINTS } from '../../../apiConfig'; 
import { useNavigate } from 'react-router-dom';
import MDSnackbar from "components/MDSnackbar";

function Cover() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [content, setContent] = useState("");

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Sign Up"
      content={content}
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Sign Up"
      content={content}
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Sign Up"
      content={content}
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Sign Up"
      content={content}
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
  const [data, setData] = useState({email: "", password: "", confirmPassword: ""});
  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError1, setPasswordError1] = useState('');
  const { setLogin } = useAuth();
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp); 
  };

  const onChange = (e) => {
    if (e.target.id === 'email' && e.target.value !== '') {
      setEmailError('');
    }
    if (e.target.id === 'password' && e.target.value !=='') {
      setPasswordError1('');
    }
    if (e.target.id === 'confirmPassword' && e.target.value !== '') {
      setPasswordError('');
    }
    setData({
      ...data,
      [e.target.id]: [e.target.value]
    });
  }

  const signUp = async () => {
    try {
      await axiosHelper.post(API_ENDPOINTS.baseEndpoints.signup, {email: data['email'][0], password: data['password'][0]});
      // alert("User Created please sign in ")
      setSuccessSB(true);
      setContent("User Created please sign in ");
      setIsSignUp(false); 
    } catch (error) {
      if (error.response) {
        const serverMessage = error.response.data; 
        setErrorSB(true);
        setContent(`Sign up failed: ${serverMessage}`)
        // alert(`Sign up failed: ${serverMessage}`);
      } else {
        // Handle other types of errors (network error, etc.)
        setErrorSB(true);
        setContent('Sign up failed')
        // alert('Sign up failed');
      }
    }
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    console.log(data['email']);
    if (data['email'][0] === '' || data['email'] === '') {
      setEmailError('Email is required!');
      setErrorSB(true);
      setContent('Email is required!');
      return;
    }
    if (data['password'][0] === '' || data['password'] === '') {
      setPasswordError1('Password is required!');
      setErrorSB(true);
      setContent('Password is required!');
      return;
    }
    if (data['password'][0] !== data['confirmPassword'][0]) {
      setPasswordError('Passwords do not match.');
      setErrorSB(true);
      setContent('Passwords do not match.');
      return; 
    }
    setPasswordError('');
    signUp();
  };

  return (
    <CoverLayout image={bgImage}>
      {renderSuccessSB}
      {renderErrorSB}
      {renderWarningSB}
      {renderInfoSB}
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput 
                id="email"
                type="text"
                value={data['email']}
                onChange={(e) => onChange(e)}
                required 
                label="Email" 
                variant="standard" 
                fullWidth 
              />
            </MDBox>
            {emailError && <div className="error" style={{ fontSize: 15, color: 'red' }}>{emailError}</div>}
            <MDBox mb={2}>
              <MDInput 
                id="password"
                type="password"
                value={data['password']}
                onChange={(e) => onChange(e)}
                required 
                label="Password" 
                variant="standard" 
                fullWidth 
              />
            </MDBox>
            {passwordError1 && <div className="error" style={{ fontSize: 15, color: 'red' }}>{passwordError1}</div>}
            <MDBox mb={2}>
              <MDInput 
                id="confirmPassword"
                type="password"
                value={data['confirmPassword']}
                onChange={(e) => onChange(e)}
                required 
                label="Confirm-Password" 
                variant="standard" 
                fullWidth 
            />
            {passwordError && <div className="error" style={{ fontSize: 15, color: 'red' }}>{passwordError}</div>}
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleSignUp} fullWidth>
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
