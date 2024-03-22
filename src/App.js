import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext'; // Adjust the import path as needed
import LoginScreen from './Pages/authentication/sign-in';
import RegisterScreen from './Pages/authentication/sign-up';
import Dashboard from './Pages/dashboard';
import ProtectedRoute from './components/ProtectedRoute'; 
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { MaterialUIControllerProvider, useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import TradeCopy from './Pages/tables';
import Account from './Pages/profile';
import FAQ from './Pages/billing';
import Army from './Pages/army';
import { Provider } from "react-redux";
import store from "./store";

function AppWrapper() {
  return (
    <AuthProvider>
		<Router>
			<MaterialUIControllerProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</MaterialUIControllerProvider>	
		</Router>
    </AuthProvider>
  );
}

function App() {

	var isLoggedIn = false;
	if (localStorage.getItem('authToken') !== null) {
		isLoggedIn = true;
	}
	const [controller, dispatch] = useMaterialUIController();
	const {
		miniSidenav,
		direction,
		layout,
		openConfigurator,
		sidenavColor,
		transparentSidenav,
		whiteSidenav,
		darkMode,
	} = controller;
	const [onMouseEnter, setOnMouseEnter] = useState(false);
	const [rtlCache, setRtlCache] = useState(null);
	const { pathname } = useLocation();
	useMemo(() => {
		const cacheRtl = createCache({
		key: "rtl",
		stylisPlugins: [rtlPlugin],
		});

		setRtlCache(cacheRtl);
	}, []);

	const handleOnMouseEnter = () => {
		if (miniSidenav && !onMouseEnter) {
			setMiniSidenav(dispatch, false);
			setOnMouseEnter(true);
		}
	};

	const handleOnMouseLeave = () => {
		if (onMouseEnter) {
			setMiniSidenav(dispatch, true);
			setOnMouseEnter(false);
		}
	};

	const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

	useEffect(() => {
		document.body.setAttribute("dir", direction);
	}, [direction]);

	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
	}, [pathname]);

	const getRoutes = (allRoutes) =>
		allRoutes.map((route) => {
			if (route.collapse) {
				return getRoutes(route.collapse);
			}

			if (route.route) {
				return <Route 
					exact 
					path={route.route} 
					element={route.component} 
					key={route.key} 
				/>;
			}

			return null;
		});

	return (
		<ThemeProvider theme={darkMode ? themeDark : theme}>
		<CssBaseline />
		{layout === "dashboard" && (
			<>
			{isLoggedIn && 
				<Sidenav
					color={sidenavColor}
					brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
					brandName="Copy Cat"
					routes={routes}
					onMouseEnter={handleOnMouseEnter}
					onMouseLeave={handleOnMouseLeave}
				/>
			}
				<Configurator />
				{/* {configsButton} */}
			</>
		)}
		{layout === "vr" && <Configurator />}
		<Routes>
			{/* {getRoutes(routes)} */}
			<Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
			{/* <Route exact path="/login" element={<LoginScreen />} />
			<Route exact path="/signup" element={<RegisterScreen />} /> */}
			<Route
				path="/inbox"
				element={
					<ProtectedRoute>
						<TradeCopy />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/docs"
				element={
					<ProtectedRoute>
						<Account />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/faq"
				element={
					<ProtectedRoute>
						<FAQ />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/army"
				element={
					<ProtectedRoute>
						<Army />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/login"
				element={
					<ProtectedRoute>
						<LoginScreen />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/signup"
				element={
					<ProtectedRoute>
						<RegisterScreen />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/logout"
				element={
					<ProtectedRoute>
						<LoginScreen />
					</ProtectedRoute>
				}
			/>
		</Routes>
		</ThemeProvider>
	);
}

export default AppWrapper;
