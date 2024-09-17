import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../api/axiosInstance';  
import context from 'context';
import clearLocalStorage from 'utils/clear-storage';


const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call the /logout endpoint to clear the refresh token on the server
        await axiosInstance.post(context.apiEndpoint.logoutUserRoute, {}, { withCredentials: true });

        // Clear the access token and other data from localStorage
        // localStorage.removeItem('accessToken');
        clearLocalStorage();

        // Redirect to the login page after successful logout
        navigate(context.appRoute.login, { replace: true });
      } catch (error) {
        console.error('Error during logout:', error);
        // In case of error, still redirect to the login page
        navigate(context.appRoute.login, { replace: true });
      }
    };

    handleLogout();  // Invoke the logout process when the component mounts
  }, [navigate]);

  return <div>Logging out...</div>;  // Show a message while logging out
};

export default Logout;
