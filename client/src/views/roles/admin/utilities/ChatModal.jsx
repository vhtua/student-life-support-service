import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Modal, IconButton, List, ListItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from 'api/axiosInstance';

const ChatModal = ({ ticketId, open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);
  const userId = parseInt(localStorage.getItem('userId'));

  useEffect(() => {
    if (ticketId) {
      axiosInstance.get(`/api/v1/messages/${ticketId}`)
        .then(res => setMessages(res.data))
        .catch(err => console.error(err));
    }
  }, [ticketId]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Chat for Ticket #{ticketId}
        </Typography>
        <List ref={chatBoxRef} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
          {messages.map((msg) => (
            <ListItem
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: msg.sender_id === userId ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor: msg.sender_id === userId ? '#bbdefb' : '#e0e0e0',
                  borderRadius: '10px',
                  p: 2,
                  maxWidth: '70%',
                }}
              >
                <Typography variant="body1">{msg.message_details}</Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#888' }}>
                  {new Date(msg.created_date).toLocaleString()}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default ChatModal;