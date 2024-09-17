import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import axiosInstance from '../api/axiosInstance';  // Import your Axios instance
import context from "../context";

import Loader from 'ui-component/Loader';


const ProtectedRoutes = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    // Send a request to verify the access token
                    const response = await axiosInstance.post(context.apiEndpoint.verifyRefreshTokenRoute, {}, { withCredentials: true });
                    // const response = await axiosInstance.post("/ping");

                    // If the token is valid, allow access
                    
                    if (response.status === 200 && response.data.valid) {
                        setIsAuthenticated(true);
                    } else {
                        // If token is invalid, clear it from localStorage and set authentication to false
                        console.log("response not good")
                        localStorage.removeItem('accessToken');
                        setIsAuthenticated(false);
                        // setLoading(false);
                    }
                } catch (error) {
                    console.error('Error verifying token:', error);
                    // Clear the token in case of error (e.g., expired or invalid)
                    localStorage.removeItem('accessToken');
                    setIsAuthenticated(false);

                    // setLoading(false);
                } finally {
                    setLoading(false);  // Stop loading state
                }
            } else {
                // No token in localStorage, so not authenticated
                setLoading(false);
                setIsAuthenticated(false);
            }
        };

        verifyToken();
    }, [token]);

    // While verifying the token, show a loading state
    if (loading) {
        return <Loader></Loader>;
    }

    // If authenticated, show the protected content, otherwise redirect to login
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
