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
import ReportCard from './utilities/ReportCard';
import ReportCard2 from './utilities/ReportCard2';

// ==============================|| REPORT ||============================== //

const Report = () => {


  return (
//   <MainCard title="Personal Information" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>

    <Grid container spacing={gridSpacing}>

      <Grid item xs={12} sm={9}>
            <ReportCard2/>
      </Grid>

      


      
    </Grid>

  );
}

export default Report;
