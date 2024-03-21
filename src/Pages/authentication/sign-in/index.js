import * as React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useAuth } from '../../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import BasicLayout from "Pages/authentication/components/BasicLayout";
import axiosHelper from '../../../Utilities/axiosHelper';
import { API_ENDPOINTS } from '../../../apiConfig'; 
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import brandWhite from "assets/images/logo-ct.png";
import MDSnackbar from "components/MDSnackbar";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Basic() {
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
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Sign In"
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
      title="Sign In"
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
      title="Sign In"
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
      title="Sign In"
      content={content}
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const [data, setData] = useState({email: "", password: ""});
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const { setLogin } = useAuth();
  const navigate = useNavigate();
  const handleLoginSuccess = (token) => {
    localStorage.setItem('authToken', token.data.token);
    setLogin()
    navigate('/dashboard'); 
  };
  
  const onChange = (e) => {
    if (e.target.id === 'email' && e.target.value !== '') {
      setEmailError('');
    }
    if (e.target.id === 'password' && e.target.value !== '') {
      setPasswordError('');
    }
    setData({
      ...data,
      [e.target.id]: [e.target.value]
    });
  }

  const login = async () => {
    
    // handleLoginSuccess("token");
    try {
      var token = await axiosHelper.post(API_ENDPOINTS.baseEndpoints.login, {email: data['email'][0], password: data['password'][0]});
      setSuccessSB(true);
      setContent("Log in is successful!");
      handleLoginSuccess(token)
      localStorage.setItem("mail", data['email'][0]);
    } catch (error) {
      if (error.response) {
        const serverMessage = error.response.data; 
        setContent(`Login failed: ${serverMessage}`);
        setErrorSB(true);
        // alert(`Login failed: ${serverMessage}`);
      } else {
        // Handle other types of errors (network error, etc.)
        setContent(`Login failed: ${error.message}`);
        setErrorSB(true);
        // alert(`Login failed: ${error.message}`);
      }
    }
  };
  

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(data['email'][0]);
    if (data['email'][0] === '' || data['email'] === '') {
      setEmailError('Email is required!');
      setWarningSB(true);
      setContent('Email is required!');
      return;
    }
    if (data['password'][0] === '' || data['password'] === '') {
      setPasswordError('Password is required!');
      setWarningSB(true);
      setContent('Password is required!');
      return;
    }
    login(); // Call the login function on form submit
  };

  return (
    <BasicLayout image={bgImage}>
      {renderSuccessSB}
      {renderErrorSB}
      {renderWarningSB}
      {renderInfoSB}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: () => {
          },
        }}
      >
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To request to manager, please enter your email address here. We
            will solve your problem.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Request</Button>
        </DialogActions>
      </Dialog>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <img src={brandWhite} style={{ width: 140, height: 140 }} />
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput 
                type="email" 
                id="email"
                label="Email" 
                fullWidth
                value={data['email']}
                onChange={(e) => onChange(e)}
                required
              />
              {emailError && <div className="error" style={{ fontSize: 15, color: 'red' }}>{emailError}</div>}
            </MDBox>
            <MDBox mb={2}>
              <MDInput 
                type="password" 
                label="Password" 
                fullWidth 
                id="password"
                value={data['password']}
                onChange={(e) => onChange(e)}
                required
              />
              {passwordError && <div className="error" style={{ fontSize: 15, color: 'red' }}>{passwordError}</div>}
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              {/* <Switch checked={rememberMe} onChange={handleForgetPw} /> */}
              <div className="ml-2 underline-offset-1">
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  onClick={handleClickOpen}
                  style={{ color: "blue" }}
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;Forgot Password ?
                </MDTypography>
              </div>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleLogin} fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/signup"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
