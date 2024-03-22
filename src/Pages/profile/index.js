import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PropTypes from "prop-types";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { connect, useDispatch } from "react-redux";
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
let brokerInfo = [];
let userInfo = {};
const cards = [
];

const CustomCard = ({ getCurrentProfile, profile, id, accountNumber1, brokerId1, userId1, pw1, brokerName1 }) => {
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [content, setContent] = useState("");
  const closeSuccessSB = () => setSuccessSB(false);
  const closeErrorSB = () => setErrorSB(false);
  const dispatch = useDispatch();
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

  const [ edit, setEdit ] = useState(false);
  var accountNumber = accountNumber1;
  var brokerId = brokerId1;
  var pw = pw1;
  var brokerName = brokerName1;
  var userId = userId1;
  const [data, setData] = useState({ id: "", accountNumber: "", brokerId: "", brokerName: "", password: "", userId: '' });
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

    const onSubmet = async() => {
        if (edit) { 
          if (data['id'] !== 'add') {
            try {
              var response = await axiosHelper.put("https://app.copiercat.com/api/Account/brokerAccount/info", {brokerAccountInfoId: data['id'], brokerId: data["brokerId"], userId: data["userId"], password: data["password"][0], accountNumber: data["accountNumber"][0]});
              userInfo = response.data;
              setContent("The brokerAccount is updated");
              setSuccessSB(true);
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
          }else{
            try {
              var response = await axiosHelper.post("https://app.copiercat.com/api/Account/brokerAccount/info", {brokerId: data["brokerId"], userId: data["userId"], password: data["password"][0], accountNumber: data["accountNumber"][0]});
              userInfo = response.data;
              setContent("The brokerAccount is created");
              setSuccessSB(true);
              getCurrentProfile();
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
      var url = "https://app.copiercat.com/api/Account/brokerAccount/info?brokerAccountId=" + id;
      try {
        var response = await axiosHelper.delete(url);
        setContent("The brokerAccount is deleted");
        setSuccessSB(true);
        getCurrentProfile();
      } catch (error) {
        if (error.response) {
          const serverMessage = error.response.data; 
          setContent("Delete is fail!");
          setErrorSB(true);
        } else {
          // Handle other types of errors (network error, etc.)
          setContent(error.message);
          setErrorSB(true);
        }
      }
    }

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.id] : [e.target.value]
        })
    }

    const onHandle = (e) => {
      let name = '';
      for (let i = 0; i < brokerInfo.length; i++) {
        if (brokerInfo[i].id === e.target.value) {
          name = brokerInfo[i].name;
        }
      }
      console.log(name, e.target.value);
      setData({
          ...data,
          brokerId: e.target.value,
          brokerName: name
      });
    }
  return (
    <Grid item xs={12} md={6} xl={3}>
      {renderSuccessSB}
      {renderErrorSB}
      <Card sx={{ maxWidth: 345 }} id={data['id']}>
        {/* <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        /> */}
        <CardContent>
          { !edit? 
           (<Typography variant="subtitle2" gutterBottom fullWidth style={{ marginBottom: 40, marginTop: 50 }}>
              Account Number: {data['accountNumber']}
            </Typography>) :
           (<TextField id="accountNumber" label="Account Number" variant="outlined" value={data['accountNumber']} fullWidth style={{ marginBottom: 30, marginTop: 50 }} onChange={onChange}/>) }
          {/* { !edit?
            (<Typography variant="subtitle2" gutterBottom fullWidth style={{ marginBottom: 40 }}>
              Email: {data['userId']}
            </Typography>) :
            (<TextField id="email" label="Account Email" value={data['userId']} variant="outlined" fullWidth style={{ marginBottom: 30 }} onChange={onChange}/>)
          } */}
          { !edit?
            (<Typography variant="subtitle2" gutterBottom fullWidth style={{ marginBottom: 40 }}>
              Password: {data['password']}
            </Typography>) :
            (<TextField id="password" label="Account Password" value={data['password']} variant="outlined" fullWidth style={{ marginBottom: 30 }} onChange={onChange}/>) }
          { !edit?
            (<Typography variant="subtitle2" gutterBottom fullWidth style={{ marginBottom: 40 }}>
              BrokerName: {data['brokerName']}
            </Typography>) :
            (<Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data['brokerId']}
              label="BrokerName"
              onChange={onHandle}
              fullWidth
              style={{ height: 44 }}
              // onChange={handleChange}
            >
              {
                brokerInfo.map((broker)=> (
                  <MenuItem value={broker.id} name={broker.name}>{broker.name}</MenuItem>
                ))
              }
              {/* <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem> */}
            </Select>) }
        </CardContent>
        <CardActions>
          <Button size="small" type="button" variant="contained" color="success" style={{color: 'blue', width: 32, marginLeft: 20 }} onClick={onSubmet}>{!edit? "Edit" : "Submit"}</Button>
          { edit && (<Button size="small" type="button" variant="contained" color="success" style={{ color: 'blue', marginLeft: 20 }} onClick={onCancel}>Cancel</Button>) }
          { !edit && (<Button size="small" type="button" variant="contained" color="warning" style={{ color: 'blue', marginLeft: 20 }} onClick={onDelete}>Delete</Button>) }
        </CardActions>
      </Card>
    </Grid>
  );
}

const CardList = ({ cards }) => {
    const [load, setLoad] = useState(true);
    const [windowHeight, setWindowHeight] = useState(0);
    const onAddCard = () => {
        setLoad(!load);
        // var id = cards.length + 1;
        cards.push({ id: "add", name: '', email: '', pw: '', age: '' });
    }

    useEffect(() => {
      const handleResize = () => setWindowHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);
      handleResize(); // Call the function to set the initial height
      return () => window.removeEventListener('resize', handleResize); // Cleanup
   }, []);

    return (
        <MDBox p={2}>
            <Grid container spacing={6}>
                {cards.map((card) => (
                    <CustomrCard1 key={card.id} id={card.id} accountNumber1={card.accountNumber} userId1={card.userId} pw1={card.pw} brokerId1={card.brokerId} brokerName1={card.brokerName} load={load} />
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

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  // const [userInfo, setUserInfo] = useState({});
  const [brokerAccount, setBrokerAccount] = useState([]);
  // const [brokerInfo, setBrokerInfo] = useState([]);
  
  useEffect(() => {
    getBroker();
    getUser();
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

  const getUser = async () => {
    try {
      var response = await axiosHelper.get('https://app.copiercat.com/api/Account/user');
      // setUserInfo(response.data);
      userInfo = response.data;
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
  const getBrokerAccount = async () => {
    try {
      var response = await axiosHelper.get('https://app.copiercat.com/api/Account/brokerAccount/info');
      var data = response.data;
      var brokerAccount = [];
      cards.length = 0;
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < brokerInfo.length; j++) {
          if (data[i].brokerId === brokerInfo[j].id) {
            data[i].brokerName = brokerInfo[j].name;
            brokerAccount.push(data[i]);
            cards.push(data[i]);
          }
        }
      }
      setBrokerAccount(brokerAccount);
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

  const getBroker = async () => {
    try{
      var response = await axiosHelper.get('https://app.copiercat.com/api/brokers');
      // setBrokerInfo(response.data);
      brokerInfo = response.data;
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
                        title="profile information"
                        description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
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
                    Profiles
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

const mapDispatchToProps = {
  getCurrentProfile
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export const CustomrCard1 = connect(mapStateToProps, { getCurrentProfile })(CustomCard);
export default connect(mapStateToProps, { getCurrentProfile })(Profile);
