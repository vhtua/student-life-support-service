import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import AuthWrapper1 from '../../AuthWrapper1';
import AuthCardWrapper from '../../AuthCardWrapper';
import ForgotPassword from './ForgotPassword';
import AuthFooter from 'views/roles/student/ui-component/cards/AuthFooter';

import validateUserRole from 'views/utilities/validateUserRole';


const ForgotPasswordWrapper = () => {
    // Get authentication status from Redux or localStorage
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated) || localStorage.getItem('accessToken');
    const roleName = isAuthenticated ? localStorage.getItem('roleName') : null;
  
    const baseRootUrl = validateUserRole.navigateRouteByUserRole(roleName);
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
                <ForgotPassword />
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default ForgotPasswordWrapper;