import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// import project components
import Loader from 'views/roles/student/ui-component/Loader';

import axiosInstance from '../api/axiosInstance';  // Import the Axios instance
import context from "../context";
import clearLocalStorage from './clear-storage';

const AdminProtectedRoutes = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const verifyToken = async () => {
            try {
                // Send a request to verify the access token
                const response = await axiosInstance.post(context.apiEndpoint.verifyRefreshTokenRoute, {}, { withCredentials: true });

                // If the token is valid, allow access to the corresponding role's protected routes
                if (response.status === 200 
                    && response.data.valid 
                    && localStorage.getItem("roleName") === response.data.role_name
                    && response.data.role_name === "Admin") {
                    
                    setIsAuthenticated(true);

                } else {
                    // If token is invalid, clear it from localStorage and set authentication to false
                    console.log(role_name);
                    console.log(typeof role_name);
                    console.log(response.data.role_name)
                    console.log("You are accessing the protected page");
                    clearLocalStorage();
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                // Clear the token in case of error (e.g., expired or invalid)
                clearLocalStorage();
                setIsAuthenticated(false);
            } finally {
                setLoading(false);  // Stop loading state
            }
        };

        if (token) {
            verifyToken();
        } else {
            // No token in localStorage, so not authenticated
            setLoading(false);
            setIsAuthenticated(false);
        }
    }, [token]);

    // While verifying the token, show a loading state
    if (loading) {
        return <Loader />;
    }

    // If authenticated, show the protected content, otherwise redirect to login
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AdminProtectedRoutes;