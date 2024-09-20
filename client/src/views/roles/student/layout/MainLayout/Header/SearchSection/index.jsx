import React from 'react';
import PropTypes from 'prop-types';
import { useState, forwardRef, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton'; // Import IconButton for clickable "x"
import { IconSearch, IconX } from '@tabler/icons-react';

import AutoComplete from './AutoComplete';

const HeaderAvatar = forwardRef(({ children, ...others }, ref) => {
  const theme = useTheme();
  return (
    <Avatar
      ref={ref}
      variant="rounded"
      sx={{
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        bgcolor: 'secondary.light',
        color: 'secondary.dark',
        '&:hover': {
          bgcolor: 'secondary.dark',
          color: 'secondary.light'
        }
      }}
      {...others}
    >
      {children}
    </Avatar>
  );
});

HeaderAvatar.propTypes = {
  children: PropTypes.node
};

const SearchSection = () => {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null); // Ref for the input element

  // Handle feature selection and navigate to the selected feature URL
  const handleSelect = (url) => {
    navigate(url);
    setValue(''); // Reset search input after selection
  };

  // Clear search input function
  const clearSearch = () => {
    setValue('');
    inputRef.current.focus(); // Refocus the input after clearing
  };

  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <OutlinedInput
          ref={inputRef} // Attach the ref to the search box
          id="input-search-header"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for feature..."
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="16px" />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              {value && (
                <IconButton onClick={clearSearch}>
                  <IconX stroke={1.5} size="16px" />
                </IconButton>
              )}
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{ 'aria-label': 'search', sx: { bgcolor: 'transparent', pl: 0.5 } }}
          sx={{ width: '100%', ml: 0.5, px: 2, bgcolor: 'background.paper' }}
        />
        {/* Render the autocomplete suggestions */}
        <AutoComplete value={value} handleSelect={handleSelect} inputRef={inputRef} />
      </Box>

      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <OutlinedInput
          ref={inputRef} // Attach the ref to the search box
          id="input-search-header"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for feature..."
          startAdornment={
            <InputAdornment position="start">
              <IconSearch stroke={1.5} size="16px" />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              {value && (
                <IconButton onClick={clearSearch}>
                  <IconX stroke={1.5} size="16px" />
                </IconButton>
              )}
            </InputAdornment>
          }
          aria-describedby="search-helper-text"
          inputProps={{ 'aria-label': 'search', sx: { bgcolor: 'transparent', pl: 0.5 } }}
          sx={{ width: { md: 250, lg: 434 }, ml: 2, px: 2 }}
        />
        {/* Render the autocomplete suggestions */}
        <AutoComplete value={value} handleSelect={handleSelect} inputRef={inputRef} />
      </Box>
    </>
  );
};

export default SearchSection;
