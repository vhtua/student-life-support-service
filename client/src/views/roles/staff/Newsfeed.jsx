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
  Link
} from '@mui/material';

import { IconReload, IconCirclePlus } from '@tabler/icons-react';

// project imports
import MainCard from 'views/roles/student/ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// Axios instance for API requests
import axiosInstance from '../../../api/axiosInstance';  // Adjust the import path as needed

import PublicTicketCard from './utilities/PublicTicketCard';
import MessageCard from './utilities/MessageCard';



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
                  handleTicketCardUpdate(); // Toggle the state to trigger a re-render
                  setTicketData([]); // Clear data 
                }}
                sx={{ mb: 2 }}
          >

                <IconReload />

                <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                    Refresh
                </Typography>

          </Button>

          <Link href={`http://localhost:3210/student/ticket/create-ticket`} sx={{ ml: 1, color: 'primary.main' }}>
          <Button 
                variant="contained"
                color="warning"
                onClick={() => {
                  handleTicketCardUpdate(); // Toggle the state to trigger a re-render
                  setTicketData([]); // Clear data 
                }}
                sx={{ ml: 1, mt: -2 }}
          >

                <IconCirclePlus />

                <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                    Create a ticket
                        
                </Typography>
                

          </Button>
          </Link>
          
        </Grid>

        
        {/* // Iterate the number of tickets in the ticketData array and create a PublicTicketCard for each ticket */}
        {ticketData.map((ticket) => (
          <Grid item xs={12} sm={4}>
            <PublicTicketCard data={ticket} handleTicketCardUpdate={handleTicketCardUpdate} />
          </Grid>
        ))}


      </Grid>

    // </MainCard>
  );
}

export default Newsfeed;
