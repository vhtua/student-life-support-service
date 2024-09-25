import React, { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MuiTypography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


// project imports
import SubCard from 'views/roles/student/ui-component/cards/SubCard';
import MainCard from 'views/roles/student/ui-component/cards/MainCard';
import SecondaryAction from 'views/roles/student/ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';


// Axios instance for API requests
import axiosInstance from '../../../api/axiosInstance';  // Adjust the import path as needed

import ProfileCard from './utilities/ProfileCard';
import SchoolDetails from './utilities/SchoolDetailsCard';
import ChangePasswordCard from './utilities/ChangePasswordCard';

// ==============================|| TYPOGRAPHY ||============================== //

const listStyle = {
  p: 0,
  width: '100%',
  maxWidth: 600,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};



const ChangePassword = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  return (
//   <MainCard title="Personal Information" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>

    <Grid container spacing={gridSpacing}>


      <Grid item xs={12} sm={6}>
          <SubCard title="Requirements for the password">
            <List sx={listStyle} aria-label="mailbox folders">

              <ListItem>
                <ListItemText primary="1. Password must be at least 8 characters long" />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="2. Password must contain at least one uppercase letter" />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="3. Password must contain at least one lowercase letter" />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="4. Password must contain at least one number" />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="5. Password must contain at least one special character" />
              </ListItem>
              

            </List>
              
          </SubCard>
      </Grid>

    
      <Grid item xs={12} sm={6}>
            <ChangePasswordCard/>
      </Grid>



    </Grid>

  );
}

export default ChangePassword;
