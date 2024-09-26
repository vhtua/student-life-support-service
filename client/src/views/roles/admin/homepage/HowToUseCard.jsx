// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// project imports
import MainCard from 'views/roles/student/ui-component/cards/MainCard';
import SubCard from '../ui-component/cards/SubCard';

// ==============================|| SAMPLE PAGE ||============================== //
const style = {
  py: 0,
  width: '100%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};


const HowToUseCard = () => (
  <SubCard title="About this service">
    <Grid item>
        <Typography variant="body2" gutterBottom>
        The Student Support Service web application is designed to assist students with their daily activities at the Vietnamese-German University (VGU). Through this system, students are able to submit support tickets and await resolution. 
        </Typography>
    </Grid>

    <Box sx={{mb: 3}}></Box>


    {/* <Box
      component="img"
      sx={{
        height: 233,
        width: 350,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
      }}
      alt="The house from the offer."
      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
    /> */}

    {/* <List sx={style}>
      <ListItem>
        <ListItemText primary="Raise support tickets and receive the assistance from VGU staff" />
      </ListItem>

      <Divider component="li" />

      <ListItem>
        <ListItemText primary="View the public support tickets of other students" />
      </ListItem>

      <Divider component="li" />

      <ListItem>
        <ListItemText primary="Contact directly with the VGU Staff about the issues" />
      </ListItem>

      <Divider component="li" />

      <ListItem>
        <ListItemText primary="Send feedback" />
      </ListItem>

    </List> */}

  </SubCard>
);

export default HowToUseCard;
