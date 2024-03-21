import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// @mui icons
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
import axios from "axios";
import axiosHelper from '../../Utilities/axiosHelper';

const CustomCard = ({ id, name1, email1, pw1, age1 }) => {
  const [ edit, setEdit ] = useState(false);
  var name = name1;
  var email = email1;
  var pw = pw1;
  var age = age1;
  const [data, setData] = useState({ name: "", email: "", password: "", age: '' });
    useEffect(() => {
        setData({
            ...data,
            name,
            email,
            password: pw,
            age
        });
    }, []); 

    const onSubmet = () => {
        if (edit) {
        alert("GET Request !");
        }
        setEdit(!edit);
    }

    const onCancel = () => {
        setData({
            ...data,
            name,
            email,
            password: pw,
            age
        });
        setEdit(!edit);
    }
    
    const onDelete = () => {
      alert(id + "-->>Card Delete GET Request !");
        // setEdit(!edit);
    }

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.id] : [e.target.value]
        })
    }

    const onHandle = (e) => {
        setData({
            ...data,
            age: e.target.value
        });
    }
  return (
    <Grid item xs={12} md={6} xl={3}>
      <Card sx={{ maxWidth: 345 }}>
        {/* <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        /> */}
        <CardContent>
          { !edit? 
           (<Typography variant="subtitle2" gutterBottom fullWidth style={{ marginBottom: 40, marginTop: 50 }}>
              Account Name: {data['name']}
            </Typography>) :
           (<TextField id="name" label="Account Name" variant="outlined" value={data['name']} fullWidth style={{ marginBottom: 30, marginTop: 50 }} onChange={onChange}/>) }
          { !edit?
            (<Typography variant="subtitle2" gutterBottom fullWidth style={{ marginBottom: 40 }}>
              Email: {data['email']}
            </Typography>) :
            (<TextField id="email" label="Account Email" value={data['email']} variant="outlined" fullWidth style={{ marginBottom: 30 }} onChange={onChange}/>)
          }
          { !edit?
            (<Typography variant="subtitle2" gutterBottom fullWidth style={{ marginBottom: 40 }}>
              Password: {data['password']}
            </Typography>) :
            (<TextField id="password" label="Account Password" value={data['password']} variant="outlined" fullWidth style={{ marginBottom: 30 }} onChange={onChange}/>) }
          { !edit?
            (<Typography variant="subtitle2" gutterBottom fullWidth style={{ marginBottom: 40 }}>
              Age: {data['age']}
            </Typography>) :
            (<Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data['age']}
              label="Age"
              onChange={onHandle}
              fullWidth
              style={{ height: 44 }}
              // onChange={handleChange}
            >
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>) }
        </CardContent>
        <CardActions>
          <Button size="small" type="button" variant={!edit? "outlined" : "contained"} style={{ color: 'blue', marginLeft: 20 }} onClick={onSubmet}>{!edit? "Edit" : "Submit"}</Button>
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
        var id = cards.length + 1;
        cards.push({ id: id, name: '', email: '', pw: '', age: '' });
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
                    <CustomCard key={card.id} id={card.id} name1={card.name} email1={card.email} pw1={card.pw} age1={card.age} load={load} />
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

const cards = [
  { id: 1, name: 'ander', email: 'feelfree0411@gmail.com', pw: '12345678', age: '30' },
  { id: 2, name: 'ander1', email: 'feelfree0411@gmail.com', pw: '12345678', age: '30' }
];

function Overview() {
  
  useEffect(() => {
    getData();
  }, []); 

  const getData = async () => {
    try {
      var response = await axiosHelper.get('https://app.copiercat.com/api/brokers');
      console.log(response.data);
      // localStorage.setItem("mail", data['email'][0]);
    } catch (error) {
      if (error.response) {
        const serverMessage = error.response.data; 
        alert(`Login failed: ${serverMessage}`);
      } else {
        // Handle other types of errors (network error, etc.)
        alert(`Login failed: ${error.message}`);
      }
    }
  }
    return (
        <DashboardLayout>
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
                <CardList cards={cards} />
            </Header>
            <Footer />
        </DashboardLayout>
    );
}

export default Overview;
