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
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state to track profile update status
  const [profileUpdated, setProfileUpdated] = useState(false);

  // Fetch book data from the server
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/books');
        setBooks(response.data);  // Assuming the response contains an array of books
        setLoading(false);  // Stop loading when data is fetched
      } catch (err) {
        setError('Failed to fetch book data');
        setLoading(false);
      }
    };

    fetchBooks();  // Call the function when the component is mounted
  }, []);

  // Callback to handle profile update
  const handleProfileUpdate = () => {
    setProfileUpdated((prevState) => !prevState); // Toggle the state to trigger a re-render
  };

  return (
    <MainCard title="Edit your profile information">
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
    </MainCard>
  );
}

export default EditProfile;
