import * as React from 'react';
import { Select, Button, Modal } from 'antd';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "Pages/trade/components/Header";
import { useState, useEffect } from "react";
import MDSnackbar from "components/MDSnackbar";
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import linkActive from "assets/images/link_active.png"
import linkInActive from "assets/images/link_inactive.png"
import AddIcon from '@mui/icons-material/Add';
import { connect } from 'react-redux';
import { getBrokerInfo } from "../../actions/profile";
import PropTypes from "prop-types";
// import { API_ENDPOINTS } from '../../apiConfig'; 
// import Typography from '@mui/material/Typography';

function TradeCopy({ getBrokerInfo, profile: { brokerInfo, loading } }) {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [content, setContent] = useState("");

  const closeSuccessSB = () => setSuccessSB(false);
  const closeInfoSB = () => setInfoSB(false);
  const closeWarningSB = () => setWarningSB(false);
  const closeErrorSB = () => setErrorSB(false);

  const [open, setOpen] = useState(false);
  // const [color, setColor] = useState("");
  const [active, setActive] = useState(false);
  const [trade, setTrade] = useState();
  const [copycat, setCopycat] = useState();

  const onTrade = (e) => {
    setTrade(e);
  }

  const onCopycat = (e) => {
    setCopycat(e);
  }

  useEffect(() => {
    getBrokerInfo();
  }, [getBrokerInfo]); 

  const onSetting = () => {
    setOpen(true);
  }

  const onActive = () => {
    setActive(!active);
  }
  
  const onReset = () => {
    setActive(false);
    setTrade();
    setCopycat();
  }

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="TradeCopy"
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
      title="TradeCopy"
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
      title="TradeCopy"
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
      title="TradeCopy"
      content={content}
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

    return (
        <DashboardLayout>
            {renderSuccessSB}
            {renderErrorSB}
            {renderWarningSB}
            {renderInfoSB}
            <Modal
              title="Setting"
              centered
              open={open}
              onOk={() => {
                setOpen(false);
                setActive(true);
                alert("Asdf");
              }}
              onCancel={() => setOpen(false)}
              okButtonProps={{ disabled: false, style: { backgroundColor: 'green' } }}
              cancelButtonProps={{ disabled: false, style: { backgroundColor: 'red' } }}
              footer={[
                <Button key="back" onClick={() => setOpen(false)}>
                  Return
                </Button>,
                <Button key="submit" type="primary" loading={false} onClick={() => {
                  setOpen(false);
                  setActive(true);
                }} danger>
                  Submit
                </Button>,
              ]}
            >
              <FormControl variant="standard" fullWidth style={{ marginBottom: 16, marginTop: 20 }}>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    With a start adornment
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    className='h-10'
                    startAdornment={
                      <InputAdornment position="start">
                        <WhatshotIcon />
                      </InputAdornment>
                    }
                  />
              </FormControl>
              <FormControl variant="standard" fullWidth style={{ marginBottom: 16 }}>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    With a start adornment
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    className='h-10'
                    startAdornment={
                      <InputAdornment position="start">
                        <WhatshotIcon />
                      </InputAdornment>
                    }
                  />
              </FormControl>
              <FormControl variant="standard" fullWidth style={{ marginBottom: 16 }}>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    With a start adornment
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    className='h-10'
                    startAdornment={
                      <InputAdornment position="start">
                        <WhatshotIcon />
                      </InputAdornment>
                    }
                  />
              </FormControl>
              <FormControl variant="standard" fullWidth style={{ marginBottom: 16 }}>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    With a start adornment
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    className='h-10'
                    startAdornment={
                      <InputAdornment position="start">
                        <WhatshotIcon />
                      </InputAdornment>
                    }
                  />
              </FormControl>
            </Modal>
            <DashboardNavbar />
            <MDBox mb={2} />
            <Header>
                <MDBox mt={5} mb={3}>
                <Grid container spacing={1} className='p-4 justify-center'>
                    <Grid item xs={10} md={4} xl={4} sx={{ display: "flex" }}>
                      <FormControl variant="standard" className='w-full'>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={trade}
                          label="Broker"
                          placeholder="Trades"
                          onChange={onTrade}
                          className="w-full"
                          style={{ height: 40}}
                          options={brokerInfo}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={2} md={1} xl={1} sx={{ display: "flex" }}>
                      <div className='flex w-full h-full' onClick={onActive}>
                        {active? 
                          (<img src={linkActive} alt='Share' className='w-8 m-auto'/>) :
                          (<img src={linkInActive} alt='Share' className='w-9 m-auto'/>)
                        }
                      </div>
                    </Grid>
                    <Grid item xs={6} md={4} xl={4} sx={{ display: "flex" }}>
                      <FormControl variant="standard" className='w-full'>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={copycat}
                          label="Broker"
                          placeholder="Copy Cat"
                          onChange={onCopycat}
                          className="w-full"
                          style={{ height: 40}}
                          options={brokerInfo}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3} xl={2} sx={{ display: "flex" }}>
                        <div className='m-auto' onClick={onSetting}>
                          <DisplaySettingsIcon style={{ width: 30, height: 30 }}/>
                        </div>
                        <div className='m-auto'>
                          <SaveIcon style={{ width: 30, height: 30 }}/>
                        </div>
                        <div className='m-auto' onClick={onReset}>
                          <RestartAltIcon style={{ width: 30, height: 30 }}/>
                        </div>
                        <div className='m-auto'>
                          <DeleteOutlineIcon style={{ width: 30, height: 30 }}/>
                        </div>
                        <div className='m-auto'>
                          <AddIcon style={{ width: 30, height: 30 }}/>
                        </div>
                    </Grid>
                </Grid>
                </MDBox>
            </Header>
            <Footer />
        </DashboardLayout>
    );
}

TradeCopy.propTypes = {
  getBrokerInfo: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getBrokerInfo })(TradeCopy);
