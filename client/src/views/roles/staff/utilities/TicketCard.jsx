import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Link, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import { IconEye, IconMessage, IconPlayerPlay, IconX, IconPaperclip, IconAnalyze, IconClockEdit, IconClockStop, IconBuilding, IconUser } from '@tabler/icons-react';
import Chip from '@mui/material/Chip';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// project imports
import axiosInstance from 'api/axiosInstance';
import context from 'context';
import ReadMore from './ReadMore';


const TicketCard = ({ ticketCardUpdate }) => {
    const [open, setOpen] = useState(false);
    const [selectedAttachment, setSelectedAttachment] = useState(null);
    const [ticketData, setTicketData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userName = localStorage.getItem('username');
        const ticketIdSelected = localStorage.getItem('ticketIdSelected');

        console.log('Ticket ID selected:', ticketIdSelected);


        if (!ticketIdSelected) {
            console.log('No ticket selected');
            setLoading(false);
            setTicketData(null);
            return;
        }

        const apiUrl = `/api/v1/tickets/pending/${ticketIdSelected}`;

        axiosInstance.get(apiUrl)
            .then(response => {
                setTicketData(response.data);
                setLoading(false);
                console.log('Ticket data:', response.data);
            })
            .catch(error => {
                console.error('Error fetching ticket data:', error);
                setTicketData("error");
                setLoading(false);
            });
    }, [ticketCardUpdate]);

    const handleOpen = (attachment) => {
        setSelectedAttachment(attachment);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAttachment(null);
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (ticketData === "error") {
        return (
            <Card sx={{ maxWidth: 600, height: 400, boxShadow: 3, borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CardContent>
                    <Typography variant="h2" align="center">
                        Something happened while fetching the ticket #{localStorage.getItem('ticketIdSelected')} data
                    </Typography>
                </CardContent>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Card>
        );
    }

    if (!ticketData) {
        return (
            <Card sx={{ maxWidth: 600, height: 400, boxShadow: 3, borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CardContent>
                    <Typography variant="h2" align="center">
                        View a ticket in the ticket list to see the details
                    </Typography>
                </CardContent>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Card>
        );
    }

    // Sample URLs for attachments
    // const attachments = [
    //     { type: 'image', url: 'https://picsum.photos/200/300' },
    //     { type: 'image', url: 'https://picsum.photos/1080/900' },
    //     { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    // ];

    const { ticket_id, username, fullname, created_date, ended_date, ticket_type_name, subject, details, audience_type, message_id, status, dorm_area, dorm_room, attachments } = ticketData;

    return (
        <Card sx={{ maxWidth: 600, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Box sx={{ mb: 2, textAlign: 'left' }}>
                    <Typography variant="h2" component="div" fontWeight="bold">
                        Ticket #{ticket_id}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>
                        {subject}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}>
                        <IconButton color="primary" sx={{ padding: 0 }}>
                            <IconUser />
                        </IconButton>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            Student: {fullname}. ID: {username}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}>
                        <IconButton color="primary" sx={{ padding: 0 }}>
                            <IconClockEdit />
                        </IconButton>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            Created Date: {new Date(created_date).toLocaleString()}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}>
                        <IconButton color="primary" sx={{ padding: 0 }}>
                            <IconClockStop />
                        </IconButton>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            Ended Date: {ended_date ? new Date(ended_date).toLocaleString() : 'N/A'}
                        </Typography>
                    </Box>


                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}>
                        <IconButton color="primary" sx={{ padding: 0 }}>
                            <IconBuilding />
                        </IconButton>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            Dorm: {dorm_area ? `${dorm_area} - ${dorm_room}` : 'N/A'}
                        </Typography>
                    </Box>


                    
                </Box>

                <Box sx={{ mb: 2, textAlign: 'left' }}>
                    <Typography component={'div'} variant="body2" fontWeight="bold">
                        Ticket Type:
                        <Chip label={ticket_type_name} color="primary" sx={{ marginLeft: '5px' }} />
                    </Typography>

                    {/* <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                        Subject: {subject}
                    </Typography> */}
                    

                    <Divider sx={{ my: 1 }}>
                        <Chip label="Details" size="small" />
                    </Divider>

                    <Typography variant="body2" color="text.primary" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                        {/* {details} */}
                        <ReadMore text={details}/>
                    </Typography>
                    <Divider sx={{ mt: 4 }} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}>
                    <IconButton color="primary" sx={{ padding: 0 }}>
                        <IconEye />
                    </IconButton>
                    <Typography component={'div'} variant="body1" sx={{ ml: 1 }}>
                        {/* <strong>Audience Type: </strong> {audience_type} */}
                        <strong>Audience Type: </strong> 
                            <Box
                                component="span"
                                sx={(theme) => ({
                                backgroundColor:
                                audience_type === 'private'
                                    ? "#673ab7" // purple
                                    : "#2196f3",
                                borderRadius: '0.6rem',
                                color: '#fff',
                                maxWidth: '9ch',
                                p: '0.25rem',
                                })}
                            >
                                {audience_type}
                            </Box>
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}>
                    <IconButton color="primary" sx={{ padding: 0 }}>
                        <IconMessage />
                    </IconButton>
                    <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                        Message: not available
                        {/* <Link href={`http://localhost:3210/staff/message?conversation_id=${ticket_id}`} sx={{ ml: 1, color: 'primary.main' }}>
                            #{ticket_id}
                        </Link> */}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}>
                    <IconButton color="primary" sx={{ padding: 0 }}>
                        <IconAnalyze />
                    </IconButton>
                    <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                        {/* Status: <span style={{ color: 'orange' }}>{status}</span> */}
                        Status: <Box
                                component="span"
                                sx={(theme) => ({
                                backgroundColor:
                                    status === 'cancelled'
                                    ? theme.palette.error.dark // cancelled - red
                                    : status === 'pending'
                                        ? theme.palette.warning.dark  // pending - yellow
                                        : status === 'in progress'
                                        ? theme.palette.info.dark     // in progress - blue 
                                        : theme.palette.success.dark, // done - green
                                borderRadius: '0.6rem',
                                color: '#fff',
                                maxWidth: '9ch',
                                p: '0.25rem',
                                })}
                            >
                                {status}
                            </Box>
                    </Typography>
                </Box>

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
                        {attachments && attachments.map((attachment, index) => (
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
                                {attachment.type.includes('image') ? (
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

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={false}
                PaperProps={{
                    style: {
                        maxWidth: 'none',
                        margin: '20px',
                    },
                }}
            >
                <DialogTitle>
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
                    {selectedAttachment && selectedAttachment.type.includes('image') ? (
                        <img
                            src={selectedAttachment.url}
                            alt="attachment"
                            style={{ maxWidth: '500px', height: 'auto', borderRadius: 8 }}
                        />
                    ) : selectedAttachment && selectedAttachment.type.includes('video') ? (
                        <video controls style={{ maxHeight: '800px', height: 'auto', borderRadius: 8 }}>
                            <source src={selectedAttachment.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : null}
                </DialogContent>
            </Dialog>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Card>
    );
};

export default TicketCard;