import React, { useState } from 'react';
import '../CSS/loginScreen.css'; 
import logo from '../logo192.png';
import axiosHelper from '../Utilities/axiosHelper';
import { useAuth } from '../components/AuthContext';
import { API_ENDPOINTS } from '../apiConfig'; 
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { setLogin } = useAuth();
  const navigate = useNavigate();
  const handleLoginSuccess = (token) => {
    localStorage.setItem('authToken', token);
    setLogin()
    navigate('/dashboard'); 
  };
  

  const toggleForm = () => {
    setIsSignUp(!isSignUp); 
  };
  
  // Define the login function
  const login = async () => {
    
    // handleLoginSuccess("token");
    try {
      var token = await axiosHelper.post(API_ENDPOINTS.baseEndpoints.login, { email, password });
      handleLoginSuccess(token)
    } catch (error) {
      if (error.response) {
        const serverMessage = error.response.data; 
        alert(`Login failed: ${serverMessage}`);
      } else {
        // Handle other types of errors (network error, etc.)
        alert(`Login failed: ${error.message}`);
      }
    }
  };

  const signUp = async () => {
    try {
      await axiosHelper.post(API_ENDPOINTS.baseEndpoints.signup, { email, password });
      alert("User Created please sign in ")
      setIsSignUp(false); 
    } catch (error) {
      if (error.response) {
        const serverMessage = error.response.data; 
        alert(`Sign up failed: ${serverMessage}`);
      } else {
        // Handle other types of errors (network error, etc.)
        alert('Sign up failed');
      }
    }
  };

  const handleSignUp = (event) => {
    debugger
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return; 
    }
    setPasswordError('');
    signUp();
  };
  

  const handleLogin = (event) => {
    event.preventDefault();
    login(); // Call the login function on form submit
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="Company Logo" className="logo" />
        {isSignUp ? (
          // Sign-up form structure
          <form onSubmit={handleSignUp}>
           <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            </div>
            <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {/* Display an error message if passwords do not match */}
          {passwordError && <div className="error">{passwordError}</div>}
          </div>
            <button type="submit" className="login-button">Sign Up</button>
            <button type="button" onClick={toggleForm}>Have an account? Sign In</button>
          </form>
        ) : (
          // Sign-in form structure
          <form onSubmit={handleLogin}>
            <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
            <button type="submit" className="login-button">Login</button>
            <button type="button" onClick={toggleForm}>Need an account? Sign Up</button>
            <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
          </form>
        )}
      </div>
    </div>
  );
};
export default LoginScreen;
