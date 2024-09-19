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
  <SubCard title="How To Use The Service ">
    <Grid item>
        <Typography variant="body2" gutterBottom>
        The Student Support Service web application is designed to assist students with their daily activities at the Vietnamese-German University (VGU). Through this system, students are able to submit support tickets and await resolution. 
        </Typography>
    </Grid>


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

    <List sx={style}>
      <ListItem>
        <ListItemText primary="Step 1: " />
      </ListItem>

      <Divider component="li" />

      <ListItem>
        <ListItemText primary="Step 2: " />
      </ListItem>

      <Divider component="li" />

      <ListItem>
        <ListItemText primary="Step 3: " />
      </ListItem>

      <Divider component="li" />

      <ListItem>
        <ListItemText primary="Step 4: " />
      </ListItem>

    </List>

  </SubCard>
);

export default HowToUseCard;
