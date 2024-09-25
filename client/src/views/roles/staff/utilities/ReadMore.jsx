import React, { useState } from 'react';
import { Typography, Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ReadMore = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wordLimit = 50;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const truncatedText = text.split(' ').slice(0, wordLimit).join(' ') + (text.split(' ').length > wordLimit ? '...' : '');

  return (
    <>
      <Typography component={'span'} variant="body2" color="text.primary" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
        {truncatedText}
        {text.split(' ').length > wordLimit && (
          <Typography component="span" color="primary" onClick={handleOpen} sx={{ cursor: 'pointer' }}>
            {' '}Read more
          </Typography>
        )}
      </Typography>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          maxHeight: 600, 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4, 
          overflowY: 'auto' 
        }}>
          <IconButton onClick={handleClose} sx={{ 
            position: 'sticky', 
            top: 0, 
            right: 1, 
            zIndex: 1, 
            bgcolor: 'background.paper' 
          }}>
            <CloseIcon />
          </IconButton>

          <Box sx={{ mt: 4 }}>
            <Typography component={'span'} variant="body2" color="text.primary" sx={{ whiteSpace: 'pre-line' }}>
              {text}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ReadMore;