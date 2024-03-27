import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; // Adjust the import path as needed
import LoginScreen from './Pages/authentication/sign-in';
import RegisterScreen from './Pages/authentication/sign-up';
import Dashboard from './Pages/dashboard';
import ProtectedRoute from './components/ProtectedRoute'; 
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import routes from "routes";
import { MaterialUIControllerProvider, useMaterialUIController, setMiniSidenav } from "context";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import TradeCopy from './Pages/trade';
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
		sidenavColor,
		transparentSidenav,
		whiteSidenav,
		darkMode,
	} = controller;
	const [onMouseEnter, setOnMouseEnter] = useState(false);
	const { pathname } = useLocation();

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

	useEffect(() => {
		document.body.setAttribute("dir", direction);
	}, [direction]);

	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
	}, [pathname]);

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
			</>
		)}
		{layout === "vr" && <Configurator />}
		<Routes>
			<Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
			<Route
				path="/tradeCopy"
				element={
					<ProtectedRoute>
						<TradeCopy />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/account"
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