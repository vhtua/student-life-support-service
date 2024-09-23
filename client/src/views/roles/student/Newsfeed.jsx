import React, { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Modal,
  Button,
} from '@mui/material';
import { IconReload } from '@tabler/icons-react';

// project imports
import MainCard from 'views/roles/student/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// Axios instance for API requests
import axiosInstance from '../../../api/axiosInstance';  // Adjust the import path as needed

import PublicTicketCard from './utilities/PublicTicketCard';
// import { set } from 'public/landing/vendor/bootstrap-5.3.3/js/dist/dom/data';



const Newsfeed = () => {
  const [ticketCardUpdate, setTicketCardUpdate] = useState(false);
  const [ticketData, setTicketData] = useState([]);

  const handleTicketCardUpdate = () => {
    setTicketCardUpdate((prevState) => !prevState); // Toggle the state to trigger a re-render
  };

  // Using axios Instance to fetch data from this api endpoint http://localhost:3000/api/v1/tickets/public-ticket
  useEffect(() => {
    axiosInstance.get('/api/v1/tickets/public-ticket')
      .then((response) => {
        console.log(response.data);
        setTicketData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ticketCardUpdate]);

  return (
    // <MainCard title="Ticket List">
      <Grid container spacing={gridSpacing}>

        <Grid item xs={12} sm={12}>
         {/* Refresh button */}
         <Button
                variant="contained"
                color="success"
                onClick={() => {
                    handleTicketCardUpdate();
                }}
                sx={{ mb: 2 }}
          >

                <IconReload />

                <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                    Refresh
                </Typography>

          </Button>
        </Grid>


        {/* // Iterate the number of tickets in the ticketData array and create a PublicTicketCard for each ticket */}
        {ticketData.map((ticket) => (
          <Grid item xs={12} sm={4}>
            <PublicTicketCard data={ticket} handleTicketCardUpdate={handleTicketCardUpdate} />
          </Grid>
        ))}

        {/* <Grid item xs={12} sm={4}>
          <PublicTicketCard />
        </Grid>

        <Grid item xs={12} sm={4}>
          <PublicTicketCard />
        </Grid>

        <Grid item xs={12} sm={4}>
          <PublicTicketCard />
        </Grid> */}


      </Grid>

    // </MainCard>
  );
}

export default Newsfeed;
