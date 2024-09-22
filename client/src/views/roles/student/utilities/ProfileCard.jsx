import { useState, useEffect } from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

// Import Icons
import FaceIcon from '@mui/icons-material/Face';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import WcIcon from '@mui/icons-material/Wc';

// Customize Card Import
import SubCard from '../ui-component/cards/SubCard';

// Import API
import context from 'context';
import axiosInstance from 'api/axiosInstance';  // Ensure you have axios instance properly configured

export default function ProfileCard({ profileUpdated }) {  // Accept profileUpdated as a prop
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details data from the server
  const fetchUserDetails = async () => {
    try {
      const username = localStorage.getItem('username');

      const response = await axiosInstance.get(context.apiEndpoint.userApi.rootApi + "/" + username);
      setUserDetails(response.data);  // Set user details
      setLoading(false);  // Stop loading when data is fetched
    } catch (err) {
      setError('Failed to fetch user data');
      setLoading(false);
    }
  };

  // Re-fetch user data when the component is mounted or profileUpdated changes
  useEffect(() => {
    fetchUserDetails();  // Fetch details when the component mounts or profileUpdated changes
  }, [profileUpdated]);  // Listen to profileUpdated prop changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <SubCard title="General Details">
      <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FaceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Full Name" secondary={userDetails?.fullname || 'N/A'} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WcIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Gender" secondary={userDetails?.gender || 'N/A'} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PhoneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Phone Number" secondary={userDetails?.phone_number || 'N/A'} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <CakeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Date of Birth" secondary={new Date(userDetails?.date_of_birth).toLocaleDateString() || 'N/A'} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationCityIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Place of Birth" secondary={userDetails?.place_of_birth || 'N/A'} />
        </ListItem>
      </List>
    </SubCard>
  );
}
