import { useState, useEffect } from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

// Import Icons
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import SchoolIcon from '@mui/icons-material/School';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

// Customize Card Import
import MainCard from 'views/roles/student/ui-component/cards/MainCard';
import SubCard from '../ui-component/cards/SubCard';

// Import API
import context from 'context';
import axiosInstance from 'api/axiosInstance';  // Make sure you have axios instance properly configured

export default function SchoolDetails() {
  const [schoolDetails, setSchoolDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details data from the server
  useEffect(() => {
    const fetchschoolDetails = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axiosInstance.get(context.apiEndpoint.userApi.rootApi);
        setSchoolDetails(response.data);  // Set user details
        setLoading(false);  // Stop loading when data is fetched
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchschoolDetails();  // Call the function when the component is mounted
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <SubCard title="School Profile Details">
      <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Role" secondary={schoolDetails?.role_name || 'N/A'} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PermContactCalendarIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="ID number" secondary={schoolDetails?.username || 'N/A'} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Email" secondary={schoolDetails?.email || 'N/A'} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SchoolIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Program" secondary={schoolDetails?.program || 'N/A'} />
        </ListItem>

      
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationCityIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Dorm Area" secondary={schoolDetails?.area || 'N/A'} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <MeetingRoomIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Dorm Room" secondary={schoolDetails?.room || 'N/A'} />
        </ListItem>

        
      </List>
    </SubCard>
  );
}
