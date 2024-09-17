import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from 'assets/images/icons/social-google.svg';

// Reducer
import { setUser, setError } from '../../../../store/authSlice';  // Import the actions from authSlice

import axiosInstance from '../../../../api/axiosInstance';  // Import Axios instance for API requests
import context from 'context';
import validateUserRole from '../../../utilities/validateUserRole'

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const googleHandler = async () => {
    console.error('Login');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  

  // // Function to handle login logic
  // const handleLogin = async (email, password) => {
  //   try {
  //     const response = await axios.post('http://localhost:6543/auth', {
  //       username: email,
  //       password,
  //     });

  //     if (response.status === 200 && response.data.message === 'OK') {
  //       dispatch(setUser({ email }));  // Dispatch setUser action to store the user
  //       navigate('/dashboard');  // Navigate to the dashboard after successful login
  //     } else {
  //       dispatch(setError('Invalid username or password'));  // Dispatch error message if login fails
  //     }
  //   } catch (error) {
  //     dispatch(setError('Login failed. Please try again.'));
  //   }
  // };


  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
       
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          
          <Box sx={{ mb: 2 }}>
            {/* <Typography variant="subtitle1">Sign in with Email address</Typography> */}
              <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                  Enter your credentials to continue
              </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        // validationSchema={Yup.object().shape({
        //   // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        //   password: Yup.string().max(255).required('Password is required')
        // })}

        onSubmit={async (values, { setErrors, setSubmitting }) => {
          try {
            // Send a POST request to the login endpoint using axiosInstance
            // const response = await axiosInstance.post(context.apiEndpoint.authenticateUserRoute, {
            //   username: values.email,
            //   password: values.password,
            // });
            const loginApiEndpoint = `${context.serverBaseUrl}${context.apiEndpoint.authenticateUserRoute}`;

            const response = await axiosInstance.post(loginApiEndpoint, {
              username: values.email,
              password: values.password,
            });
            

            if (response.status === 200 && response.data.accessToken) {
              const accessToken = response.data.accessToken;

              // Store the access token in localStorage
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('roleName', response.data.role_name);
              localStorage.setItem('fullName', response.data.fullname);

              // Optionally store user information in Redux
              dispatch(setUser({ username: values.email, role_name: response.data.role_name }));

              // Navigate to the dashboard after successful login
              // navigate('/dashboard');

              navigate(validateUserRole.navigateRouteByUserRole(response.data.role_name))
            } else {
              // Handle server response error
              setErrors({ submit: 'Invalid username or password' });
            }
          } catch (error) {
            if (error.response && error.response.status === 401) {
              setErrors({ submit: 'Invalid username or password' });
            } else {
              // Handle any other unexpected errors
              setErrors({ submit: 'An error occurred. Please try again.' });
            }
          } finally {
            setSubmitting(false);  // Stop the submitting state
          }
        }}
        
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
