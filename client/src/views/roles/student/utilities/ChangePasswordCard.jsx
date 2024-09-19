import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// For captcha
import ReCAPTCHA from "react-google-recaptcha";


import Grid from '@mui/material/Grid';
import MainCard from 'views/roles/student/ui-component/cards/MainCard';
import SubCard from '../ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

// For alert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Password hashing
import passwordTool from 'utils/password-tool';

// Axios Instance
import axiosInstance from 'api/axiosInstance';
import context from 'context';

import clearLocalStorage from 'utils/clear-storage';


// Validation Schema using Yup
const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Please confirm your new password'),
  captcha: Yup.boolean().oneOf([true], 'You must complete the captcha'),
});

const ChangePasswordCard = () => {
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = React.createRef();

  const handleClickShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const onCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Change password!")
    if (!captchaVerified) {
      toast.error("Please verify the captcha!");
      return;
    }
    if (values.currentPassword === values.newPassword) {
      toast.warning("Your current password and new password cannot be the same");
      return;
    }

    // // Hash the input password
    // try {  
    //   const hashedNewPassword = await passwordTool.hashPassword(values.newPassword);
      
    //   if (isMatch) {
    //       console.log('Password matches!');
    //   } else {
    //       console.log('Incorrect password.');
    //   }
    // } catch (error) {
    //     console.error(error.message);
    // }

    // Make the POST request to the backend
    try {
      const response = await axiosInstance.patch('http://localhost:3000/api/v1/users/change-password', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (response.status === 200) {
        toast.success("Password changed successfully!\nYou are about to sign out");
        // alert("Password changed successfully!");
        resetForm();
        recaptchaRef.current.reset();
        setCaptchaVerified(false); // Reset captcha verification after form submission
        

        setTimeout(async () => {
          try {
            // Call the /logout endpoint to clear the refresh token on the server
            await axiosInstance.post(context.apiEndpoint.logoutUserRoute, {}, { withCredentials: true });
            // Clear the access token and other data from localStorage
            clearLocalStorage();
            window.location.href = '/login';
          } catch (err) {
            console.error("Error logging out:", err);
          }
        }, 4000); // 5000 milliseconds = 5 seconds

        // window.location.href = '/login';
      }
    } catch (error) {
      // toast.error("Error changing password. Please try again.");
      toast.error(`${error.response.data.message}. Please try again.`);
      // alert(`Error ${error.response.status}: ${error.response.data.message}. Please try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SubCard title="Change Password">
            <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
                {/* <Typography variant="h4" gutterBottom align="center">
                  Change Password
                </Typography> */}

<Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
          // captcha: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
          <Form>
            {/* Current Password Field */}
            <Box mb={3}>
              <TextField
                fullWidth
                type={showPassword.currentPassword ? 'text' : 'password'}
                name="currentPassword"
                label="Enter your current password"
                variant="outlined"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.currentPassword && Boolean(errors.currentPassword)}
                helperText={touched.currentPassword && errors.currentPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword('currentPassword')}
                        edge="end"
                      >
                        {showPassword.currentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* New Password Field */}
            <Box mb={3}>
              <TextField
                fullWidth
                type={showPassword.newPassword ? 'text' : 'password'}
                name="newPassword"
                label="Enter new password"
                variant="outlined"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword('newPassword')}
                        edge="end"
                      >
                        {showPassword.newPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Confirm Password Field */}
            <Box mb={3}>
              <TextField
                fullWidth
                type={showPassword.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                label="Enter new password again"
                variant="outlined"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword('confirmPassword')}
                        edge="end"
                      >
                        {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* reCAPTCHA */}
            <Box mb={3} display="flex" justifyContent="center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LdG0iMmAAAAAMc92UYnBUcVagNQQlaTIC3130BG"
                onChange={onCaptchaChange}
              />
            </Box>

                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting || !captchaVerified}
                        sx={{
                          backgroundColor: '#f7984c', // Custom default color
                          '&:hover': {
                            backgroundColor: '#f58427', // Custom hover color
                          },
                        }}
                      >
                        Change Password
                      </Button>
                    </Form>
                  )}
                </Formik>
                  <ToastContainer 
                  position="bottom-right" 
                  autoClose={5000} 
                  hideProgressBar={false} 
                  newestOnTop={false} 
                  closeOnClick 
                  rtl={false} 
                  pauseOnFocusLoss 
                  draggable 
                  pauseOnHover 
                  />
              </Box>
        </SubCard>
  );
};

export default ChangePasswordCard;
