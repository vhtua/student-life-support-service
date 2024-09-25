import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { TextField, Button, List, ListItem, Box, Typography, MenuItem, IconButton, ListItemText, Grid  } from '@mui/material';
import { styled } from '@mui/system';

import axiosInstance from 'api/axiosInstance';

const socket = io('http://localhost:3000');

const ChatBubble = styled(Box)(({ isUser }) => ({
    maxWidth: '60%',
    padding: '10px 15px',
    borderRadius: '15px',
    marginBottom: '10px',
    backgroundColor: isUser ? '#ADD8E6' : '#f0f0f0', // Light blue for the user, light grey for others
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    color: isUser ? 'black' : 'black',
    position: 'relative',
    '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        [isUser ? 'right' : 'left']: '-10px',
        width: 0,
        height: 0,
        border: `10px solid transparent`,
        borderTopColor: isUser ? '#ADD8E6' : '#f0f0f0',
        [isUser ? 'borderRight' : 'borderLeft']: 'none',
        [isUser ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: '5px',
    },
}));

function MessageCard( {conversation_id, sender_id} ) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [allConversationId, setAllConversationID] = useState([]);
    const [conversationId, setConversationId] = useState(!conversation_id ? 0 : conversation_id ); // Assuming one conversation
    const [senderId, setSenderId] = useState(parseInt(localStorage.getItem('userId')) || 0); // Set senderId to the value of userId in localStorage or 0 if not found
    const [senderFullName, setSenderFullName] = useState(localStorage.getItem('fullName')); // Hardcoded sender name for demo purposes

    const chatBoxRef = useRef(null);

    useEffect(() => {
        // console.log('Conversation ID:', conversationId);
        setConversationId(conversation_id);

        axiosInstance.get(`/api/v1/messages/conversation`)
        .then(res => setAllConversationID(res.data))
        .catch(err => {
            console.error(err)
            setAllConversationID([]);
        });
    }, [])


    useEffect(() => {
        socket.emit('join_conversation', conversationId);

        // Fetch previous messages
        axiosInstance.get(`/api/v1/messages/${conversationId}`)
            .then(res => setMessages(res.data))
            .catch(err => {
                console.error(err)
                setMessages([]);});

        socket.on('receive_message', (newMessage) => {
            console.log("Co tin nhan moi");
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, [conversationId, messages]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    // Set the conversation id to the selected value in the drop down box
    const setConversation = (e) => {
        setConversationId(e.target.value);
        // navigate to the route /staff/message?conversation_id={e.target.value}
        // window.location.href = `/staff/message?conversation_id=${e.target.value}`;
        const url = new URL(window.location);
        url.searchParams.set('conversation_id', e.target.value);
        window.history.pushState({}, '', url);

        // setSenderId(13);
        // console.log(e.target.value);
    };

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('send_message', {
                ticket_id: conversationId,
                sender_id: senderId,
                sender_fullName: senderFullName,
                message_details: message,
            });
            setMessage('');
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '80vh',
            padding: '20px',
            backgroundColor: '#f5f5f5',
        }}>
            <TextField
                id="conversationId"
                select
                label="Select Ticket ID"
                value={conversationId} // Ensure the value is set to conversationId state
                onChange={setConversation}
                variant="outlined"
                style={{ marginBottom: '20px' }}
            >
                {allConversationId.length === 0 ? (
                    <MenuItem value={null}>
                        No Conversation Found
                    </MenuItem>
                ) : (
                    allConversationId
                        .sort((a, b) => a.ticket_id - b.ticket_id) // Sort by ticket_id
                        .map((conversation) => (
                            <MenuItem key={conversation.ticket_id} value={conversation.ticket_id}>
                                #{conversation.ticket_id}: {conversation.subject}
                            </MenuItem>
                        ))
                )}
            </TextField>

            <List
                ref={chatBoxRef}
                style={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    padding: '10px',
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                }}
            > 
                {messages.map((msg) => (
                    <ListItem
                        key={msg.id}
                        style={{ display: 'flex', justifyContent: msg.sender_id === senderId ? 'flex-end' : 'flex-start' }}
                    >
                        <ChatBubble isUser={msg.sender_id === senderId}>
                            {/* { console.log(msg) } */}
                            <Typography>{msg.message_details}</Typography>
                            <Typography variant="caption" style={{ display: 'block', marginTop: '8px', color: '#888' }}>
                                {msg.sender_fullName}
                            </Typography>
                            <Typography variant="caption" style={{ display: 'block', color: '#888' }}>
                                {new Date(msg.created_date).toLocaleString()}
                            </Typography>
                        </ChatBubble>
                    </ListItem>
                ))}
            </List>
            <TextField
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                variant="outlined"
                style={{ marginTop: '20px' }}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />

            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={sendMessage}
                style={{ marginTop: '10px' }}
                sx={{
                    backgroundColor: '#f7984c', // Custom default color
                    '&:hover': {
                        backgroundColor: '#f58427', // Custom hover color
                    },
                }}
            >
                Send
            </Button>
        </div>
    );
}

export default MessageCard;
