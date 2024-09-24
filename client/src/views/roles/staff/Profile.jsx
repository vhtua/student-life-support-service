import React, { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MuiTypography from '@mui/material/Typography';


// project imports
import { gridSpacing } from 'store/constant';
import MainCard from './ui-component/cards/MainCard';

// Axios instance for API requests
import axiosInstance from '../../../api/axiosInstance';  // Adjust the import path as needed

import ProfileCard from './utilities/ProfileCard';
import SchoolDetailsCard from './utilities/SchoolDetailsCard';

// ==============================|| TYPOGRAPHY ||============================== //

const Typography = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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


  return (
//   <MainCard title="Personal Information" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
  <MainCard title="Personal Information">
    <Grid container spacing={gridSpacing}>

      <Grid item xs={12} sm={6}>
            <ProfileCard />
      </Grid>

      <Grid item xs={12} sm={6}>
            <SchoolDetailsCard/>
      </Grid>


      
    </Grid>
  </MainCard>
  );
}

export default Typography;
