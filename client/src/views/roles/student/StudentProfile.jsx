import React, { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'views/roles/student/ui-component/cards/SubCard';
import MainCard from 'views/roles/student/ui-component/cards/MainCard';
import SecondaryAction from 'views/roles/student/ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';


// Axios instance for API requests
import axiosInstance from '../../../api/axiosInstance';  // Adjust the import path as needed

import ProfileCard from './utilities/ProfileCard';
import SchoolDetails from './utilities/SchoolDetails';

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



        {/* Book Data Section */}
        {/* <Grid item xs={12}>
          <SubCard title="Books">
            <Grid container direction="column" spacing={1}>
              {loading ? (
                <Grid item>
                  <MuiTypography variant="body1" gutterBottom>
                    Loading book data...
                  </MuiTypography>
                </Grid>
              ) : error ? (
                <Grid item>
                  <MuiTypography variant="body1" color="error" gutterBottom>
                    {error}
                  </MuiTypography>
                </Grid>
              ) : (
                books.map((book, index) => (
                  <Grid item key={index}>
                    <MuiTypography variant="body1" gutterBottom>
                      {book.title} by {book.author}
                    </MuiTypography>
                  </Grid>
                ))
              )}
            </Grid>
          </SubCard>
        </Grid> */}



      <Grid item xs={12} sm={6}>
            <ProfileCard/>
      </Grid>

      <Grid item xs={12} sm={6}>
            <SchoolDetails/>
      </Grid>


      {/* <Grid item xs={12} sm={6}>
        <SubCard title="Dormitory Details">
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <MuiTypography variant="subtitle1" gutterBottom>
                subtitle1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
              </MuiTypography>
            </Grid>
            <Grid item>
              <MuiTypography variant="subtitle2" gutterBottom>
                subtitle2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur
              </MuiTypography>
            </Grid>
          </Grid>
        </SubCard>
      </Grid> */}


      {/* <Grid item xs={12} sm={6}>
        <SubCard title="Body">
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <MuiTypography variant="body1" gutterBottom>
                body1. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
              </MuiTypography>
            </Grid>
            <Grid item>
              <MuiTypography variant="body2" gutterBottom>
                body2. Lorem ipsum dolor sit connecter adieu siccing eliot. Quos blanditiis tenetur unde suscipit, quam beatae rerum
                inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
              </MuiTypography>
            </Grid>
          </Grid>
        </SubCard>
      </Grid> */}


      {/* <Grid item xs={12} sm={6}>
        <SubCard title="Extra">
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <MuiTypography variant="button" display="block" gutterBottom>
                button text
              </MuiTypography>
            </Grid>
            <Grid item>
              <MuiTypography variant="caption" display="block" gutterBottom>
                caption text
              </MuiTypography>
            </Grid>
            <Grid item>
              <MuiTypography variant="overline" display="block" gutterBottom>
                overline text
              </MuiTypography>
            </Grid>
            <Grid item>
              <MuiTypography
                variant="body2"
                color="primary"
                component={Link}
                href="https://berrydashboard.io"
                target="_blank"
                display="block"
                underline="hover"
                gutterBottom
              >
                https://berrydashboard.io
              </MuiTypography>
            </Grid>
          </Grid>
        </SubCard>
      </Grid> */}
      
    </Grid>
  </MainCard>
  );
}

export default Typography;
