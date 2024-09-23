import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Typography, Box, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { DropzoneArea } from 'mui-file-dropzone';
import { IconTicket } from '@tabler/icons-react';

// project imports
import axiosInstance from 'api/axiosInstance';

// ==============================|| CREATE TICKET CARD ||============================== //

const CreateTicketCard = () => {
    const [ticketTypes, setTicketTypes] = useState([]);
    const [audienceTypes, setAudienceTypes] = useState([]);

    useEffect(() => {
        const fetchDropdownValues = async () => {
            try {
                const ticketTypeResponse = await axiosInstance.get('/api/v1/tickets/ticket-type');
                const audienceTypeResponse = await axiosInstance.get('/api/v1/tickets/audience-type');

                console.log(audienceTypeResponse);

                if (Array.isArray(ticketTypeResponse.data)) {
                    const formattedTicketTypes = ticketTypeResponse.data.map(type => ({
                        id: type.id,
                        name: type.ticket_type
                    }));
                    setTicketTypes(formattedTicketTypes);
                } else {
                    console.error('Ticket types response is not an array');
                }

                if (Array.isArray(audienceTypeResponse.data)) {
                    const formattedAudienceTypes = audienceTypeResponse.data.map(type => ({
                        id: type.id,
                        name: type.audience_type
                    }));
                    setAudienceTypes(formattedAudienceTypes);
                } else {
                    console.error('Audience types response is not an array');
                }
            } catch (error) {
                console.error('Error fetching dropdown values', error);
            }
        };

        fetchDropdownValues();
    }, []);

    const formik = useFormik({
        initialValues: {
            ticket_type: '',
            subject: '',
            details: '',
            audience_type: '',
            attachments: [],
        },
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append('created_date', new Date().toISOString());
                formData.append('ticket_type_id', values.ticket_type);
                formData.append('subject', values.subject);
                formData.append('content', values.details);
                formData.append('audience_type_id', values.audience_type);
                formData.append('ticket_status_id', 1);
                values.attachments.forEach((file, index) => {
                    formData.append('attachments', file);
                });

                console.log('Form data:', formData);

                const createTicket = await axiosInstance.post('/api/v1/tickets/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                alert('Ticket created successfully');
            } catch (error) {
                console.error('Error creating ticket', error);
                alert('Failed to create ticket');
            }
        },
    });

    return (
        <Box p={3} boxShadow={3} borderRadius={2}>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}>
                <IconButton sx={{ padding: 0 }}>
                    <IconTicket />
                </IconButton>
                <Typography variant="h4" color="text.secondary" sx={{ ml: 1 }}>
                    Create a support ticket
                </Typography>
            </Box>

            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="ticket_type"
                            name="ticket_type"
                            label="Ticket Type"
                            select
                            value={formik.values.ticket_type}
                            onChange={formik.handleChange}
                            SelectProps={{
                                MenuProps: {
                                    PaperProps: {
                                        sx: {
                                            '& .Mui-selected': {
                                                backgroundColor: '#f7984c; !important', // Custom selected color
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            {ticketTypes.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="subject"
                            name="subject"
                            label="Subject"
                            value={formik.values.subject}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="details"
                            name="details"
                            label="Details"
                            multiline
                            rows={8}
                            value={formik.values.details}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="audience_type"
                            name="audience_type"
                            label="Audience Type"
                            select
                            value={formik.values.audience_type}
                            onChange={formik.handleChange}
                            SelectProps={{
                                MenuProps: {
                                    PaperProps: {
                                        sx: {
                                            '& .Mui-selected': {
                                                // Custom selected color
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            {audienceTypes.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <DropzoneArea
                            acceptedFiles={['image/*', 'video/*']}
                            dropzoneText="Drag and drop image or video files here or click"
                            onChange={(files) => formik.setFieldValue('attachments', files)}
                            maxFileSize={50 * 1024 * 1024}
                            filesLimit={3}
                            showPreviews={true}
                            showPreviewsInDropzone={false}
                            previewGridProps={{
                                container: { spacing: 2, direction: 'row' },
                            }}
                            previewText="Selected files (maximum 3 files):"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ border: '1px solid #ccc', borderRadius: 1, p: 2, mt: 2, wordWrap: 'break-word' }}>
                            <Typography variant="h6">Uploaded Files:</Typography>
                            <List sx ={{wordWrap: 'inherit'}}>
                                {formik.values.attachments.map((file, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={`${index + 1}. ${file.name}`} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" fullWidth type="submit" 
                            sx={{
                                backgroundColor: '#f7984c', // Custom default color
                                '&:hover': {
                                    backgroundColor: '#f58427', // Custom hover color
                                },
                            }}
                        >
                            Create this ticket
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default CreateTicketCard;