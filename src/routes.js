import Dashboard from './Pages/dashboard';
import TradeCopy from './Pages/tables';
import Account from './Pages/profile';
import FAQ from './Pages/billing';
import SignIn from "Pages/authentication/sign-in";
// import SignUp from "Pages/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
//
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Trade Copy",
    key: "tradeCopy",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/inbox",
    component: <TradeCopy />,
  },
  {
    type: "collapse",
    name: "Account",
    key: "account",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/docs",
    component: <Account />,
  },
  {
    type: "collapse",
    name: "FAQ",
    key: "faq",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/faq",
    component: <FAQ />,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/logout",
    component: <SignIn />,
  },
];

export default routes;
