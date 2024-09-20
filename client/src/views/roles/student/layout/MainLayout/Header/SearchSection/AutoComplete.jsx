import PropTypes from 'prop-types';
import { Popper, Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

import navigateToRoute from 'views/roles/student/utilities/navigateToRoute';


// AutoComplete Component
const AutoComplete = ({ value, handleSelect, inputRef }) => {
  // Example features list (you can replace this with a dynamic list)
  const features = [
    { name: 'Homepage', url: '/homepage' },
    { name: 'Profile', url: '/profile' },
    { name: 'Settings/Edit Profile', url: '/settings/edit-profile' },
    { name: 'Settings/Change Password', url: '/settings/change-password' },
  ];

  // Filter features based on user input
  const filteredFeatures = features.filter((feature) =>
    feature.name.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <Popper
      open={Boolean(value)}
      anchorEl={inputRef.current}
      placement="bottom-start"
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 8], // Adjust this for spacing
          },
        },
      ]}
      style={{ zIndex: 1300, width: inputRef.current ? inputRef.current.offsetWidth : 'auto' }} // Matches the input width
    >
      <Card sx={{ bgcolor: 'background.default', border: 0, boxShadow: 3 }}>
        {filteredFeatures.length > 0 ? (
          <List>
            {filteredFeatures.map((feature) => (
              <ListItem key={feature.url} disablePadding>
                <ListItemButton onClick={() => handleSelect(navigateToRoute(feature.url))}>
                  <ListItemText primary={feature.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          // Show "No matched feature!" if there are no filtered results
          <Typography sx={{ p: 2, textAlign: 'center' }} variant="body2" color="textSecondary">
            No matched feature!
          </Typography>
        )}
      </Card>
    </Popper>
  );
};

AutoComplete.propTypes = {
  value: PropTypes.string,
  handleSelect: PropTypes.func,
  inputRef: PropTypes.object
};

export default AutoComplete;
