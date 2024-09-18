import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

// Import Icon
import FaceIcon from '@mui/icons-material/Face';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';


// customize Card import 
import MainCard from 'views/roles/student/ui-component/cards/MainCard';


export default function ProfileCard() {
  return (
    <MainCard title="Profile Information">
    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
      
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FaceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Full Name" secondary={localStorage.getItem("fullName")} />
      </ListItem>


      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </List>
    </MainCard>
  );
}
