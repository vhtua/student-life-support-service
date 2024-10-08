import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import AuthWrapper1 from '../../AuthWrapper1';
import AuthCardWrapper from '../../AuthCardWrapper';
import AuthLogin from './AuthLogin';
import LoginLogo from 'views/roles/student/ui-component/LoginLogo';
import AuthFooter from 'views/roles/student/ui-component/cards/AuthFooter';

// For alert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import validateUserRole from 'views/utilities/validateUserRole';
import axios from 'axios';

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  // get param for reset password
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetPasswordToken = searchParams.get('token') || null;

  // Get authentication status from Redux or localStorage
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated) || localStorage.getItem('accessToken');
  const roleName = isAuthenticated ? localStorage.getItem('roleName') : null;

  const baseRootUrl = validateUserRole.navigateRouteByUserRole(roleName);

  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));


  // make an post request axios to reset password
  if (resetPasswordToken) {
    axios.patch('http://localhost:3000/auth/reset-password', {
      token: resetPasswordToken,
    }) 
    .then(response => {
      toast.success('Password reset successful');
    })
    .catch(error => {
      toast.error('There was an error resetting the password');
      console.error('There was an error resetting the password:', error);
    });
  }
  // alert(resetPasswordToken);

  if (isAuthenticated) {
    return <Navigate to={baseRootUrl} replace />;
  } 

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#" aria-label="logo">
                      <LoginLogo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          {/* <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                            Hi, Welcome Back
                          </Typography> */}
                          {/* <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                            Enter your credentials to continue
                          </Typography> */}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography component={Link} to="" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Don&apos;t have an account?
                      </Typography>
                      <Typography component={Link} to="" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Please contact the administrator
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>

          <ToastContainer containerId="login-toast-container"
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
    </AuthWrapper1>
  );
};

export default Login;