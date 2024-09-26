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
import AnnouncementCard from './utilities/AnnouncementCard';



const Announcement = () => {
  const [announcementCardUpdate, setAnnouncementCardUpdate] = useState(false);
  const [announcementData, setAnnouncementData] = useState([]);

  const handleAnnouncementCardUpdate = () => {
    setAnnouncementCardUpdate((prevState) => !prevState); // Toggle the state to trigger a re-render
  };

  
  useEffect(() => {
    axiosInstance.get('/api/v1/announcement')
      .then((response) => {
        console.log(response.data);
        setAnnouncementData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [announcementCardUpdate]);


  // Usage example
  // const notification = {
  //   title: "New Campus Cafeteria Opening on October 1st",
  //   fullname: "Trần Văn Sinh",
  //   created_date: "2024-09-21T07:15:13.000Z",
  //   content: "Dear Resident,\r\nPlease be advised that maintenance work is scheduled in Dormitory Block A on September 25th, 2024, from 10:00 AM to 2:00 PM. Water and electricity will be temporarily unavailable during this time. We apologize for any inconvenience caused.\r\n\r\nBest regards,\r\nStudent Affairs Office"
  // };

  return (
    // <MainCard title="Ticket List">
      <Grid container spacing={gridSpacing}>

        <Grid item xs={12} sm={12}>
         {/* Refresh button */}
         <Button
                variant="contained"
                // color="success"
                onClick={() => {
                  handleAnnouncementCardUpdate(); // Toggle the state to trigger a re-render
                  setAnnouncementData([]); // Clear data 
                }}
                sx={{ backgroundColor: '#5bbaea', mb: 2 }}
          >

                <IconReload />

                <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                    Refresh
                </Typography>

          </Button>
        </Grid>

        
        {/* // Iterate the number of tickets in the ticketData array and create a PublicTicketCard for each ticket */}
        {/* {ticketData.map((ticket) => (
          <Grid item xs={12} sm={4}>
            <PublicTicketCard data={ticket} handleTicketCardUpdate={handleTicketCardUpdate} />
          </Grid>
        ))} */}



        {/* <Grid item xs={12} sm={8}>
          <NotificationCard notification={notification} />
        </Grid> */}


        {announcementData.map((eachAnnouncement) => (
          <Grid item xs={12} sm={12}>
            <AnnouncementCard announcement={eachAnnouncement} handleAnnouncementCardUpdate={announcementCardUpdate} />
          </Grid>
        ))}



      </Grid>

    // </MainCard>
  );
}

export default Announcement;
