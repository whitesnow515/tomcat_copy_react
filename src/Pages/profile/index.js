import Grid from "@mui/material/Grid";
import { connect } from 'react-redux';
import Divider from "@mui/material/Divider";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from "prop-types";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "Pages/profile/components/Header";
import { useState, useEffect } from "react";
import axiosHelper from '../../Utilities/axiosHelper';
import MDSnackbar from "components/MDSnackbar";
import { getCurrentProfile } from "../../actions/profile";
import { Select } from 'antd';
import swal from 'sweetalert';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { API_ENDPOINTS } from '../../apiConfig'; 

let brokerInfo = [];

var brokerOption = [];

const CustomCard = ({ getCurrentProfile, profile: { profiles, loading }, id, accountNumber1, brokerId1, userId1, pw1, brokerName1 }) => {
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [content, setContent] = useState("");
  const closeSuccessSB = () => setSuccessSB(false);
  const closeErrorSB = () => setErrorSB(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [ edit, setEdit ] = useState(false);
  var accountNumber = accountNumber1;
  var brokerId = brokerId1;
  var pw = pw1;
  var brokerName = brokerName1;
  var userId = userId1;
  const [data, setData] = useState({ id: "", accountNumber: "", brokerId: "", brokerName: "", password: "", userId: '', email: "", url: "", server: "", accountPw: "", accountId: "" });
    useEffect(() => {
        setData({
            ...data,
            id,
            accountNumber,
            brokerId,
            password: pw,
            brokerName,
            userId
        });
    }, []); 

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onCheck = (event) => {
    setChecked(event.target.checked);
  };  

  const onSubmet = async() => {
    if (edit) {
      console.log(data["accountNumber"]);
      if (data["brokerId"] === null) {
        setContent("Please select brokername correctly!");
        setErrorSB(true);
        return;
      }
      if (data['id'] !== 'add') {
        if (data["accountNumber"] === '') {
          setContent("AccountNumber is required!");
          setErrorSB(true);
          return;
        }
        if (data["accountNumber"].length < 3) {
          setContent("AccountNumber length must be at least 3 characters!");
          setErrorSB(true);
          return;
        }
        if (data["password"] === undefined) {
          setContent("Password is required!");
          setErrorSB(true);
          return;
        }
        if (data["password"].length < 3) {
          setContent("Password length must be at least 3 characters!");
          setErrorSB(true);
          return;
        }
        try {
          let flag = -1;
          for (let i = 0; i < profiles.length; i++) {
            if (profiles[i].brokerId === data["brokerId"]) {
              flag ++;
            }
          }
          if (flag === 0) {
            await axiosHelper.put(API_ENDPOINTS.profileEndpoints.getProfiles, {brokerAccountInfoId: data['id'], brokerId: data["brokerId"], userId: data["userId"], password: data["password"], accountNumber: data["accountNumber"]});
            setContent("The brokerAccount is updated");
            setSuccessSB(true);
            getCurrentProfile();
          }else{
            setContent("Your brokername is already exist!");
            setErrorSB(true);
            return;
          }
        } catch (error) {
          if (error.response) {
            const serverMessage = error.response.data; 
            setContent(serverMessage);
            setErrorSB(true);
          } else {
            setContent(error.message);
            setErrorSB(true);
          }
        }
      }else{
        if (data["accountNumber"] === '') {
          setContent("AccountNumber is required!");
          setErrorSB(true);
          return;
        }
        if (data["accountNumber"].length < 3) {
          setContent("AccountNumber length must be at least 3 characters!");
          setErrorSB(true);
          return;
        }
        if (data["password"] === '') {
          setContent("Password is required!");
          setErrorSB(true);
          return;
        }
        if (data["password"].length < 3) {
          setContent("Password length must be at least 3 characters!");
          setErrorSB(true);
          return;
        }
        if (data["brokerId"] === undefined) {
          setContent("Please select brokername correctly!");
          setErrorSB(true);
          return;
        }
        try {
          let flag = 0;
          for (let i = 0; i < profiles.length; i++) {
            if (profiles[i].brokerId === data["brokerId"]) {
              setContent("Your brokername is already exist!");
              setErrorSB(true);
              flag = 1;
              return;
            }
          }
          if (flag === 0) {
            await axiosHelper.post(API_ENDPOINTS.profileEndpoints.getProfiles, {brokerId: data["brokerId"], userId: data["userId"], password: data["password"], accountNumber: data["accountNumber"]});
            setContent("The brokerAccount is created");
            setSuccessSB(true);
            getCurrentProfile();
          }
        } catch (error) {
          if (error.response) {
            const serverMessage = error.response.data; 
            setContent(serverMessage);
            setErrorSB(true);
          } else {
            // Handle other types of errors (network error, etc.)
            setContent(error.message);
            setErrorSB(true);
          }
        }
      }
    }
    setEdit(!edit);
  }

  const onCancel = () => {
      setData({
          ...data,
          id,
          accountNumber,
          brokerId,
          password: pw,
          brokerName,
          userId
      });
      setEdit(!edit);
  }
  
  const onDelete = async () => {
    if (data['id'] === 'add') {
      getCurrentProfile();
    }else{
      var url = API_ENDPOINTS.profileEndpoints.getProfiles + "?brokerAccountId=" + id;
      try {
        await axiosHelper.delete(url);
        setContent("The brokerAccount is deleted");
        setSuccessSB(true);
        getCurrentProfile();
      } catch (error) {
        if (error.response) {
          setContent("Delete is fail!");
          setErrorSB(true);
        } else {
          // Handle other types of errors (network error, etc.)
          setContent(error.message);
          setErrorSB(true);
        }
      }
    }
  }

  const onChange = (e) => {
    console.log(data['password']);
      setData({
          ...data,
          [e.target.id] : [e.target.value][0]
      })
  }

  const onHandle = (e) => {
    let name = '';
    for (let i = 0; i < brokerInfo.length; i++) {
      if (brokerInfo[i].id === e) {
        name = brokerInfo[i].name;
      }
    }
    console.log(name, e);
    setData({
        ...data,
        brokerId: e,
        brokerName: name
    });
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

  const showAlert = () => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this s file!",
      icon: "warning",
      buttons: {
        cancel: "No",
        confirm: "OK"
      },
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        onDelete();
        swal("Poof! Your profile file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your profile file is safe!", {
          icon: "error",
        });
      }
    });
  };

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
    <Grid item xs={12} md={6} xl={3}>
      {renderSuccessSB}
      {renderErrorSB}
      <Card sx={{ maxWidth: 345 }} id={data['id']}>
        <CardContent>
          { !edit?
            (<Typography variant="subtitle2" gutterBottom fullWidth style={{ marginBottom: 40, marginTop: 50 }}>
              Broker: {data['brokerName']}
            </Typography>) :
            (<Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={data['brokerId']}
              label="Broker"
              onChange={onHandle}
              className="w-full"
              style={{ height: 44, marginBottom: 20, marginTop: 50 }}
              options={brokerOption}
              />) }
          { !edit? 
           (<Typography variant="subtitle2" gutterBottom fullWidth style={{ marginBottom: 40 }}>
              Broker ID: {data['accountId']}
            </Typography>) :
           (<TextField id="accountId" label="Broker ID" variant="outlined" value={data['accountId']} fullWidth style={{ marginBottom: 20}} onChange={onChange}/>) }
          { !edit?
            (<Typography variant="subtitle2" gutterBottom fullWidth style={{ marginBottom: 30 }}>
              Password: {data['password']}
            </Typography>) :
            (
              <FormControl className="w-full" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={data['password']}
                  onChange={onChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
          )}
          { edit && <FormControlLabel control={<Checkbox checked={checked} onChange={onCheck}/>} label="PlatformAccountInfo" className="mt-3" /> }
          { checked && (
            <>
              <TextField id="email" type="email" label="Email" variant="outlined" value={data['email']} fullWidth style={{ marginBottom: 20, marginTop: 10}} onChange={onChange}/>
              <TextField id="url" label="URL" type="url" variant="outlined" value={data['url']} fullWidth style={{ marginBottom: 20}} onChange={onChange}/>
              <TextField id="server" label="Server" variant="outlined" value={data['server']} fullWidth style={{ marginBottom: 20}} onChange={onChange}/>
              <TextField id="accountNumber" label="Broker ID" variant="outlined" value={data['accountNumber']} fullWidth style={{ marginBottom: 20}} onChange={onChange}/>
              <FormControl className="w-full" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="accountPw"
                  type={showPassword ? 'text' : 'password'}
                  value={data['accountPw']}
                  onChange={onChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </>
          ) }
        </CardContent>
        <CardActions>
          <Button size="small" type="button" variant="contained" color="success" style={{color: 'blue', width: 32, marginLeft: 20 }} onClick={onSubmet}>{!edit? "Edit" : "Submit"}</Button>
          { edit && (<Button size="small" type="button" variant="contained" color="success" style={{ color: 'blue', marginLeft: 20 }} onClick={onCancel}>Cancel</Button>) }
          { !edit && (<Button size="small" type="button" variant="contained" color="warning" style={{ color: 'blue', marginLeft: 20 }} onClick={showAlert}>Delete</Button>) }
        </CardActions>
      </Card>
    </Grid>
  );
}

  const CardList = ({ cards }) => {
      const [load, setLoad] = useState(true);
      const onAddCard = () => {
          setLoad(!load);
          // var id = cards.length + 1;
          cards.push({ id: "add", name: '', email: '', pw: '', age: '' });
      }

      return (
          <MDBox p={2}>
              <Grid container spacing={6}>
                  {cards.map((card) => (
                      <CustomrCard1 key={card.id} id={card.id} accountNumber1={card.accountId} userId1={card.userId} pw1={card.pw} brokerId1={card.brokerId} brokerName1={card.brokerName} load={load} />
                  ))}
                  <Grid item xs={12} md={6} xl={3}>
                      <Card sx={{ maxWidth: 345 }} style={{ height: '100%', justifyContent: 'center' }} onClick={onAddCard}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                          </svg>
                      </Card>
                  </Grid>
              </Grid>
          </MDBox>
      );
  };

  function Profile({ getCurrentProfile, profile: { profiles, loading } }) {
    const [successSB, setSuccessSB] = useState(false);
    const [infoSB, setInfoSB] = useState(false);
    const [warningSB, setWarningSB] = useState(false);
    const [errorSB, setErrorSB] = useState(false);
    const [content, setContent] = useState("");

    const closeSuccessSB = () => setSuccessSB(false);
    const closeInfoSB = () => setInfoSB(false);
    const closeWarningSB = () => setWarningSB(false);
    const closeErrorSB = () => setErrorSB(false);
    
    useEffect(() => {
      getBroker();
      getCurrentProfile();
      // getBrokerAccount();
    }, [getCurrentProfile]); 

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

    const renderInfoSB = (
      <MDSnackbar
        icon="notifications"
        title="Profile"
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
        title="Profile"
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
        title="Profile"
        content={content}
        open={errorSB}
        onClose={closeErrorSB}
        close={closeErrorSB}
        bgWhite
      />
    );

    const getBroker = async () => {
      try{
        var response = await axiosHelper.get(API_ENDPOINTS.profileEndpoints.brokerInfo);
        // setBrokerInfo(response.data);
        brokerInfo = response.data;
        brokerOption.length = 0;
        brokerInfo.map((broker) => {
          brokerOption.push({label: broker.name, value: broker.id})
          return null;
        });
      } catch (error) {
        if (error.response) {
          const serverMessage = error.response.data; 
          setContent(serverMessage);
          setErrorSB(true);
        } else {
          // Handle other types of errors (network error, etc.)
          setContent(error.message);
          setErrorSB(true);
        }
      }
    }
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
                  <Grid container spacing={1}>
                      <Grid item xs={12} md={9} xl={6} sx={{ display: "flex" }}>
                      <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                      <ProfileInfoCard
                          // title="profile information"
                          // description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                          info={{
                          // fullName: "Pages",
                          email: localStorage.getItem('mail'),
                          location: "USA",
                          }}
                          social={[
                          {
                              link: "https://www.facebook.com/CreativeTim/",
                              icon: <FacebookIcon />,
                              color: "facebook",
                          },
                          {
                              link: "https://twitter.com/creativetim",
                              icon: <TwitterIcon />,
                              color: "twitter",
                          },
                          {
                              link: "https://www.instagram.com/creativetimofficial/",
                              icon: <InstagramIcon />,
                              color: "instagram",
                          },
                          ]}
                          action={{ route: "", tooltip: "Edit Profile" }}
                          shadow={false}
                      />
                      <Divider orientation="vertical" sx={{ mx: 0 }} />
                      </Grid>
                      {/* <Grid item xs={12} xl={4}>
                      <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
                      </Grid> */}
                  </Grid>
                  </MDBox>
                  <MDBox pt={2} px={2} lineHeight={1.25}>
                  <MDTypography variant="h6" fontWeight="medium">
                      Broker Accounts
                  </MDTypography>
                  </MDBox>
                  <CardList cards={profiles} />
              </Header>
              <Footer />
          </DashboardLayout>
      );
  }

  Profile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
  };

  const mapStateToProps = (state) => ({
    profile: state.profile,
  });

export const CustomrCard1 = connect(mapStateToProps, { getCurrentProfile })(CustomCard);
export default connect(mapStateToProps, { getCurrentProfile })(Profile);
