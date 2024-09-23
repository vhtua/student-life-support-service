import { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

import {
    Box,
    IconButton,
    Tooltip,
    Typography,
    Modal,
    Button,
} from '@mui/material';

import { IconReload } from '@tabler/icons-react';

// For alert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThumbUp, Close } from '@mui/icons-material';
import { Rating } from '@mui/lab';

import axiosInstance from 'api/axiosInstance';
import context from 'context';


// ==============================|| Tickets List Card ||============================== //

const TicketRateCard = ({ onTicketCardUpdate }) => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [rating, setRating] = useState(0);
    const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);

    // Fetch data from API
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const username = localStorage.getItem('username');
                const apiUrl = context.apiEndpoint.ticketApi.rootApi + "/" + username;

                const response = await axiosInstance.get(apiUrl);
                const filteredData = response.data.filter(ticket => ticket.status_name === 'done');
                setData(filteredData);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, [isRatingSubmitted]); // Add isRatingSubmitted to the dependency array

    // Define the columns for the table
    const columns = useMemo(
        () => [
            {
                accessorKey: 'ticket_id',
                header: 'Ticket ID',
                size: 30,
            },
            {
                accessorKey: 'ticket_type_name',
                header: 'Ticket Type',
                size: 150,
            },
            {
                accessorKey: 'subject',
                header: 'Subject',
                size: 200,
            },
            {
                accessorKey: 'audience_type',
                header: 'Audience Type',
                size: 50,
            },
            {
                accessorKey: 'status_name',
                header: 'Status',
                size: 50,
                Cell: ({ cell }) => (
                    <Box
                        component="span"
                        sx={(theme) => ({
                            backgroundColor:
                                cell.getValue() === 'cancelled'
                                    ? theme.palette.error.dark // "#f5821f" cancelled - red
                                    : cell.getValue() === 'pending'
                                        ? theme.palette.warning.dark  // pending - yellow
                                        : cell.getValue() === 'in progress'
                                            ? theme.palette.info.dark     // in progress - blue 
                                            : theme.palette.success.dark, // done - green
                            borderRadius: '0.6rem',
                            color: '#fff',
                            maxWidth: '9ch',
                            p: '0.25rem',
                        })}
                    >
                        {cell.getValue()?.toLocaleString?.('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                    </Box>)
            },
            {
                accessorKey: 'created_date',
                header: 'Created Date',
                size: 100,
                Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
            },
            {
                accessorKey: 'ended_date',
                header: 'Ended Date',
                size: 100,
                Cell: ({ cell }) => cell.getValue() ? new Date(cell.getValue()).toLocaleString() : 'N/A',
            },
            {
                accessorKey: 'rating_score',
                header: 'Rating Score',
                size: 50,
                Cell: ({ row }) => {
                    const [ratingScore, setRatingScore] = useState(null);

                    useEffect(() => {
                        const fetchRating = async () => {
                            try {
                                const response = await axiosInstance.get(`/api/v1/rating/${row.original.ticket_id}`);
                                setRatingScore(response.data.rating_score);
                            } catch (error) {
                                console.error('Error fetching rating score:', error);
                            }
                        };

                        fetchRating();
                    }, [row.original.ticket_id, isRatingSubmitted]);

                    return ratingScore !== null ? ratingScore + ' / 5' : 'N/A' ;
                }
            },
        ],
        [isRatingSubmitted]
    );

    // Initialize the table
    const table = useMaterialReactTable({
        columns,
        data,
        positionActionsColumn: 'last',
        enableBottomToolbar: false,
        enableStickyHeader: true,
        enableStickyFooter: true,
        enablePagination: false,
        enableRowActions: true,
        muiTableContainerProps: { sx: { maxHeight: '400px' } },
        renderRowActions: ({ row }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Tooltip title="Rate">
                    <IconButton
                        onClick={() => {
                            setSelectedTicketId(row.original.ticket_id);
                            setOpen(true);
                        }}
                    >
                        <ThumbUp />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        muiTableBodyRowProps: ({ rowIndex }) => ({
            sx: {
                backgroundColor: rowIndex % 2 === 0 ? '#f5821f' : '#ffffff',
            },
        }),
    });

    const handleClose = () => {
        setOpen(false);
        setRating(0);
    };

    const handleSubmit = async () => {
        try {
            const apiUrl = `/api/v1/rating`;
            await axiosInstance.post(apiUrl, {
                ticket_id: selectedTicketId,
                rating: rating,
                created_date: new Date().toISOString(),
            });
            toast.success('Rating submitted successfully');
            onTicketCardUpdate(); // Notify parent component to refresh TicketCard
            setIsRatingSubmitted(prev => !prev); // Toggle isRatingSubmitted to trigger rerender
            handleClose();
        } catch (error) {
            console.error('Error submitting rating:', error);
            toast.error('Failed to submit rating, may be you have already rated this ticket.');
        }
        setOpen(false);
        setRating(0);
    };

    return (
        <Box>
            
            {/* Refresh button */}
            <Button
                variant="contained"
                color="success"
                onClick={() => {
                    setIsRatingSubmitted(prev => !prev);
                    setData([]); // Clear data to trigger useEffect
                }}
                sx={{ mb: 2 }}
            >

                <IconReload />

                <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                    Refresh
                </Typography>

            </Button>


            <MaterialReactTable table={table} />

            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>

                    <IconButton
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        onClick={handleClose}
                    >
                        <Close />
                    </IconButton>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, textAlign: 'left' }}>
                        <IconButton color="primary" sx={{ padding: 0 }}>
                            <ThumbUp />
                        </IconButton>
                        <Typography variant="h2" sx={{ ml: 2 }}>
                            Rate this ticket
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Rating
                            name="ticket-rating"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                            sx={{ fontSize: '3rem' }} // Increase the size of the stars
                        />
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{ mt: 2,
                                backgroundColor: '#f7984c', // Custom default color
                                '&:hover': {
                                    backgroundColor: '#f58427', // Custom hover color
                                },
                            }}

                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>

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
        </Box>
    );
};

export default TicketRateCard;
