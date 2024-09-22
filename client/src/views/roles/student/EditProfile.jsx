import React, { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import MainCard from 'views/roles/student/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// Axios instance for API requests
import axiosInstance from '../../../api/axiosInstance';  // Adjust the import path as needed

import ProfileCard from './utilities/ProfileCard';
import EditProfileCard from './utilities/EditProfileCard';

const EditProfile = () => {
  // New state to track profile update status
  const [profileUpdated, setProfileUpdated] = useState(false);


  // Callback to handle profile update
  const handleProfileUpdate = () => {
    setProfileUpdated((prevState) => !prevState); // Toggle the state to trigger a re-render
  };

  return (
    // <MainCard title="Edit your profile information">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={6}>
          {/* Pass profileUpdated to trigger refetch or rerender in ProfileCard */}
          <ProfileCard profileUpdated={profileUpdated} />
        </Grid>

        <Grid item xs={12} sm={6}>
          {/* Pass the callback to EditProfileCard */}
          <EditProfileCard onProfileUpdate={handleProfileUpdate} />
        </Grid>
      </Grid>
    // </MainCard>
  );
}

export default EditProfile;
