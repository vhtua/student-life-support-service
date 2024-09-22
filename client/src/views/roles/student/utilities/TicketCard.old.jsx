import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Link, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import { IconEye, IconMessage, IconPlayerPlay, IconX, IconPaperclip, IconAnalyze, IconClockEdit, IconClockStop } from '@tabler/icons-react';
import SubCard from '../ui-component/cards/SubCard';
import Chip from '@mui/material/Chip';



const TicketCard = () => {
  // Sample URLs for attachments
  const attachments = [
    { type: 'image', url: 'https://picsum.photos/200/300' },
    { type: 'image', url: 'https://picsum.photos/1080/900' },
    { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  ];

  // State for managing modal open/close and active attachment
  const [open, setOpen] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState(null);

  // Open modal with selected attachment
  const handleOpen = (attachment) => {
    setSelectedAttachment(attachment);
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedAttachment(null);
  };
  

  return (
    <Card sx={{ maxWidth: 600, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        {/* Ticket ID and Dates */}
        <Box sx={{ mb: 2, textAlign: 'left' }}>
          <Typography variant="h3" component="div" fontWeight="bold">
            Ticket #9123
          </Typography>
          <Divider sx={{ my: 1 }} />

        
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}> 
            <IconButton color="primary" sx={{ padding: 0 }}>
                <IconClockEdit />
            </IconButton>

            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                Created Date: 9/22/2024, 7:20:32 PM
            </Typography>
          </Box>
          


          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}> 
            <IconButton color="primary" sx={{ padding: 0 }}>
                <IconClockStop />
            </IconButton>

            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                Ended Date: N/A
            </Typography>
          </Box>
          
        </Box>

        {/* Ticket Type, Subject, and Content */}
        <Box sx={{ mb: 2, textAlign: 'left' }}>
          
          <Typography variant="body2" fontWeight="bold">
            Ticket Type: 
                <Chip label="Dormitory issues" color="primary" sx={{marginLeft: "5px"}} />
          </Typography>


          <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
            Subject: Broken Faucet
          </Typography>
          {/* <Divider  /> */}

          <Divider sx={{ my: 1 }}>
            <Chip label="Details" size="small" />
          </Divider>

          <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
            The faucet in room 661 of the orange dormitory (D1) is broken. Could you
            please help fix it? Thank you.
          </Typography>
          <Divider sx={{ mt: 4 }}/>
        </Box>

        {/* Audience Type and Message */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}>
          <IconButton color="primary" sx={{ padding: 0 }}>
            <IconEye />
          </IconButton>
          <Typography variant="body1" sx={{ ml: 1 }}>
          <strong>Audience Type: </strong> private
          </Typography>
        </Box>

        {/* Message Hyperlink */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}>
          <IconButton color="primary" sx={{ padding: 0 }}>
            <IconMessage />
          </IconButton>
          <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
            Message:
            <Link href="/message/9812" sx={{ ml: 1, color: 'primary.main' }}>
              #9812
            </Link>
          </Typography>
        </Box>

        {/* Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}>
            <IconButton color="primary" sx={{ padding: 0 }}>
                <IconAnalyze />
            </IconButton>

            <Typography variant="body1" fontWeight="bold"  sx={{ ml: 1 }}>
                Status: <span style={{ color: 'orange' }}>Pending</span>
            </Typography>
        </Box>

        {/* Attachments */}
        <Box sx={{ textAlign: 'left' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}>
            <IconButton color="primary" sx={{ padding: 0 }}>
                <IconPaperclip />
            </IconButton>

            <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                Attachments:
            </Typography>
            </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            {attachments.map((attachment, index) => (
              <Box
                key={index}
                sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  boxShadow: 2,
                  position: 'relative',
                }}
                onClick={() => handleOpen(attachment)}
              >
                {/* Show image or video preview thumbnail */}
                {attachment.type === 'image' ? (
                  <img
                    src={attachment.url}
                    alt={`attachment-${index}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <>
                    <video
                      src={attachment.url}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      muted
                      playsInline
                    />
                    {/* Play icon overlay for video */}
                    <IconPlayerPlay
                      style={{
                        position: 'absolute',
                        color: 'white',
                        fontSize: '40px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  </>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>

      {/* Dialog for displaying selected attachment */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={false} // Allow the dialog to grow based on image size
        PaperProps={{
          style: {
            maxWidth: 'none',
            margin: '20px', // Add some margin around the dialog for smaller images
          },
        }}
      >
        <DialogTitle>
          {/* Close button on top right */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <IconX />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {selectedAttachment && selectedAttachment.type === 'image' ? (
            <img
              src={selectedAttachment.url}
              alt="attachment"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
            />
          ) : selectedAttachment && selectedAttachment.type === 'video' ? (
            <video controls style={{ width: '100%', height: 'auto', borderRadius: 8 }}>
              <source src={selectedAttachment.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TicketCard;
