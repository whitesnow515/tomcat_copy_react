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
import axiosHelper from '../../Utilities/axiosHelper';
import { API_ENDPOINTS } from '../../apiConfig'; 
// import Typography from '@mui/material/Typography';


const Trade = ({ profile: { brokerInfo, loading }, id, traderAccountId1, copyCatAccountId1, fixedTp1, fixedSl1, finalStop1 }) => {
    const [successSB, setSuccessSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const [content, setContent] = useState("");
    const closeSuccessSB = () => setSuccessSB(false);
    const closeErrorSB = () => setErrorSB(false);
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(false);
    const [ edit, setEdit ] = useState(false);
    const [ editable, setEditable ] = useState(false);
    const [ submitable, setSubmitable] = useState(false);
    var traderAccountId = traderAccountId1;
    var copyCatAccountId = copyCatAccountId1;
    var fixedTp = fixedSl1;
    var finalStop = finalStop1;
    var fixedSl = fixedTp1;
    const [data, setData] = useState({ id: "", traderAccountId: null, copyCatAccountId: null, finalStop: "", fixedSl: '', fixedTp: "" });
    const [open, setOpen] = useState(false);
    // const [color, setColor] = useState("");
    const [active, setActive] = useState(false);
  
    const onTrade = (e) => {
      setData({
        ...data,
        traderAccountId: e
      });
    }
  
    const onCopycat = (e) => {
      setData({
        ...data,
        copyCatAccountId: e
      });
    }
  
    const onSetting = () => {
      setOpen(true);
    }
  
    const onActive = () => {
      setActive(!active);
    }
    
    const onReset = () => {
      setActive(false);
      setData({
        ...data,
        copyCatAccountId: null,
        traderAccountId: null
      });
    }
      useEffect(() => {
        if (id === 'add') {
          setEdit(true);
        }
        setData({
            ...data,
            id,
            traderAccountId,
            copyCatAccountId,
            fixedTp,
            finalStop,
            fixedSl
        });
      }, []); 
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const onCheck = (event) => {
      setChecked(event.target.checked);
    };  
  
    // const onSubmet = async() => {
    //   if (edit) {
    //     console.log(data["traderAccountId"]);
    //     if (data["copyCatAccountId"] === null) {
    //       setContent("Please select brokername correctly!");
    //       setErrorSB(true);
    //       return;
    //     }
    //     if (data['id'] !== 'add') {
    //       if (data["traderAccountId"] === '') {
    //         setContent("AccountNumber is required!");
    //         setErrorSB(true);
    //         return;
    //       }
    //       if (data["traderAccountId"].length < 3) {
    //         setContent("AccountNumber length must be at least 3 characters!");
    //         setErrorSB(true);
    //         return;
    //       }
    //       if (data["password"] === undefined) {
    //         setContent("Password is required!");
    //         setErrorSB(true);
    //         return;
    //       }
    //       if (data["password"].length < 3) {
    //         setContent("Password length must be at least 3 characters!");
    //         setErrorSB(true);
    //         return;
    //       }
    //       try {
    //         let flag = -1;
    //         for (let i = 0; i < profiles.length; i++) {
    //           if (profiles[i].copyCatAccountId === data["copyCatAccountId"]) {
    //             flag ++;
    //           }
    //         }
    //         if (flag === 0) {
    //           await axiosHelper.put(API_ENDPOINTS.profileEndpoints.getProfiles, 
    //             {
    //               brokerAccountInfoId: data['id'], 
    //               platformId: data["copyCatAccountId"], 
    //               fixedSl: data["fixedSl"], 
    //               password: data["password"], 
    //               accountId: data["accountId"],
    //               platformAccountInfoJson: {
    //                 Email: data["email"],
    //                 Url: data["url"],
    //                 Server: data["server"],
    //                 AccountNumber: data["traderAccountId"],
    //                 Password: data["accountPw"]
    //               }
    //             }
    //             );
    //           setContent("The brokerAccount is updated");
    //           setSuccessSB(true);
    //           getTrades();
    //         }else{
    //           setContent("Your brokername is already exist!");
    //           setErrorSB(true);
    //           return;
    //         }
    //       } catch (error) {
    //         if (error.response) {
    //           const serverMessage = error.response.data; 
    //           setContent(serverMessage);
    //           setErrorSB(true);
    //         } else {
    //           setContent(error.message);
    //           setErrorSB(true);
    //         }
    //       }
    //     }else{
    //       if (data["traderAccountId"] === '') {
    //         setContent("AccountNumber is required!");
    //         setErrorSB(true);
    //         return;
    //       }
    //       if (data["traderAccountId"].length < 3) {
    //         setContent("AccountNumber length must be at least 3 characters!");
    //         setErrorSB(true);
    //         return;
    //       }
    //       if (data["password"] === '') {
    //         setContent("Password is required!");
    //         setErrorSB(true);
    //         return;
    //       }
    //       if (data["password"].length < 3) {
    //         setContent("Password length must be at least 3 characters!");
    //         setErrorSB(true);
    //         return;
    //       }
    //       if (data["copyCatAccountId"] === undefined) {
    //         setContent("Please select brokername correctly!");
    //         setErrorSB(true);
    //         return;
    //       }
    //       try {
    //         let flag = 0;
    //         for (let i = 0; i < profiles.length; i++) {
    //           if (profiles[i].copyCatAccountId === data["copyCatAccountId"]) {
    //             setContent("Your brokername is already exist!");
    //             setErrorSB(true);
    //             flag = 1;
    //             return;
    //           }
    //         }
    //         if (flag === 0) {
    //           console.log(
    //             {
    //               platformId: data["copyCatAccountId"], 
    //               password: data["password"], 
    //               accountId: data["accountId"],
    //               platformAccountInfoJson: {
    //                   Email: data["email"],
    //                   Url: data["url"],
    //                   Server: data["server"],
    //                   AccountNumber: data["traderAccountId"],
    //                   Password: data["accountPw"]
    //               }
    //             });
    //           await axiosHelper.post(API_ENDPOINTS.profileEndpoints.getProfiles, 
    //             {
    //               platformId: data["copyCatAccountId"], 
    //               password: data["password"], 
    //               accountId: data["accountId"],
    //               platformAccountInfoJson: {
    //                   Email: data["email"],
    //                   Url: data["url"],
    //                   Server: data["server"],
    //                   AccountNumber: data["traderAccountId"],
    //                   Password: data["accountPw"]
    //               }
    //             }
    //           );
    //           setContent("The brokerAccount is created");
    //           setSuccessSB(true);
    //           getTrades();
    //         }
    //       } catch (error) {
    //         if (error.response) {
    //           const serverMessage = error.response.data; 
    //           setContent(serverMessage);
    //           setErrorSB(true);
    //         } else {
    //           // Handle other types of errors (network error, etc.)
    //           setContent(error.message);
    //           setErrorSB(true);
    //         }
    //       }
    //     }
    //   }
    //   setEdit(!edit);
    // }
  
    const onCancel = () => {
        setData({
            ...data,
            id,
            traderAccountId,
            copyCatAccountId,
            password: fixedTp,
            finalStop,
            fixedSl
        });
        setEdit(!edit);
    }
    
    // const onDelete = async () => {
    //   if (data['id'] === 'add') {
    //     getTrades();
    //   }else{
    //     var url = API_ENDPOINTS.profileEndpoints.getProfiles + "?brokerAccountId=" + id;
    //     try {
    //       await axiosHelper.delete(url);
    //       setContent("The brokerAccount is deleted");
    //       setSuccessSB(true);
    //       getTrades();
    //     } catch (error) {
    //       if (error.response) {
    //         setContent("Delete is fail!");
    //         setErrorSB(true);
    //       } else {
    //         // Handle other types of errors (network error, etc.)
    //         setContent(error.message);
    //         setErrorSB(true);
    //       }
    //     }
    //   }
    // }
  
    const onChange = (e) => {
        setData({
            ...data,
            [e.target.id] : [e.target.value][0]
        })
        if (data['traderAccountId'] === "") {
          setSubmitable(false);
          return;
        }
        if (data['copyCatAccountId'] === "") {
          setSubmitable(false);
          return;
        }
        setSubmitable(true);
    }
  
    const onHandle = (e) => {
      let name = '';
      for (let i = 0; i < brokerInfo.length; i++) {
        if (brokerInfo[i].id === e) {
          name = brokerInfo[i].name;
        }
      }
      setData({
          ...data,
          copyCatAccountId: e,
          finalStop: name
      });
      setEditable(true);
    }
  
    const renderSuccessSB = (
      <MDSnackbar
        color="success"
        icon="check"
        title="Profile"
        content={content}
        open={successSB}
        onClose={closeSuccessSB}
        close={closeSuccessSB}
        bgWhite
      />
    );
  
    // const showAlert = () => {
    //   swal({
    //     title: "Are you sure?",
    //     text: "You will not be able to recover this s file!",
    //     icon: "warning",
    //     buttons: {
    //       cancel: "No",
    //       confirm: "OK"
    //     },
    //     dangerMode: true,
    //   })
    //   .then((willDelete) => {
    //     if (willDelete) {
    //       onDelete();
    //       swal("Poof! Your profile file has been deleted!", {
    //         icon: "success",
    //       });
    //     } else {
    //       swal("Your profile file is safe!", {
    //         icon: "error",
    //       });
    //     }
    //   });
    // };
  
    const renderErrorSB = (
      <MDSnackbar
        color="error"
        icon="warning"
        title="Profile"
        content={content}
        open={errorSB}
        onClose={closeErrorSB}
        close={closeErrorSB}
        bgWhite
      />
    );
  
    return (
      <div>
        <Modal
          title="Setting"
          centered
          open={open}
          onOk={() => {
            setOpen(false);
            setActive(true);
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
                FixedTp
              </InputLabel>
              <Input
                id="fixedTp"
                className='h-10'
                value={data["fixedTp"]}
                onChange={onChange}
                startAdornment={
                  <InputAdornment position="start">
                    <WhatshotIcon />
                  </InputAdornment>
                }
              />
          </FormControl>
          <FormControl variant="standard" fullWidth style={{ marginBottom: 16 }}>
              <InputLabel htmlFor="input-with-icon-adornment">
                FixedSl
              </InputLabel>
              <Input
                id="fixedSl"
                className='h-10'
                value={data["fixedSl"]}
                onChange={onChange}
                startAdornment={
                  <InputAdornment position="start">
                    <WhatshotIcon />
                  </InputAdornment>
                }
              />
          </FormControl>
          <FormControl variant="standard" fullWidth style={{ marginBottom: 16 }}>
              <InputLabel htmlFor="input-with-icon-adornment">
                FinalStop
              </InputLabel>
              <Input
                id="finalStop"
                className='h-10'
                value={data["finalStop"]}
                onChange={onChange}
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
        <Grid container spacing={1} className='p-4 justify-center'>
            <Grid item xs={10} md={4} xl={4} sx={{ display: "flex" }}>
              <FormControl variant="standard" className='w-full'>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data['traderAccountId']}
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
                  value={data['copyCatAccountId']}
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
      </div>
    );
  }

const TradeList = ({ data }) => {
  let trades = data;
  if (trades.length === 0) {
    trades.push({
      id: "add",
      traderAccountId: null,
      copyCatAccountId: null,
      settings : {
        fixedTp: "",
        fixedSl: "",
        finalStop: ""
      }
    });
  }
  return (
      <MDBox>
        {trades.map((trade) => (
            <Trade1 key={trade.id} id={trade.id} traderAccountId1={trade.traderAccountId} copyCatAccountId1={trade.copyCatAccountId} fixedTp1={trade.settings.fixedTp} fixedSl1={trade.settings.fixedSl} finalStop1={trade.settings.finalStop}/>
        ))}
      </MDBox>
  );
};

function TradeCopy({ getBrokerInfo}) {
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

  const dummydata = [];

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
            <DashboardNavbar />
            <MDBox mb={2} />
            <Header>
                <MDBox mt={5} mb={3}>
                  <TradeList data={dummydata} />
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

export const Trade1 = connect(mapStateToProps, { getBrokerInfo })(Trade);
export default connect(mapStateToProps, { getBrokerInfo })(TradeCopy);
