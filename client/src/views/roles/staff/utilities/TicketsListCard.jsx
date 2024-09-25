import { useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import Modal from '@mui/material/Modal';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Button
} from '@mui/material';

import { Visibility } from '@mui/icons-material';
import BuildIcon from '@mui/icons-material/Build';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconReload } from '@tabler/icons-react';

import axiosInstance from 'api/axiosInstance';
import context from 'context';

// ==============================|| Tickets List Card ||============================== //

const TicketsListCard = ({ onTicketCardUpdate }) => {
  const [data, setData] = useState([]);
  const [isRefresh, setRefresh] = useState(false);


  const handleRefresh = () => {
    setRefresh((prevState) => !prevState); // Toggle the state to trigger a re-render
  };


  // Fetch data from API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const username = localStorage.getItem('username');
        const apiUrl = `/api/v1/tickets/pending-ticket`;

        const response = await axiosInstance.get(apiUrl);
        console.log('Tickets:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, [isRefresh]);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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
        Cell: ({ cell }) => (
          <Box
              component="span"
              sx={(theme) => ({
              backgroundColor:
              cell.getValue() === 'private'
                  ? "#673ab7" // purple
                  : "#2196f3",
              borderRadius: '0.6rem',
              color: '#fff',
              maxWidth: '9ch',
              p: '0.25rem',
              })}
          >
              {cell.getValue()}
          </Box>
        )
      },
      {
        accessorKey: 'status',
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
    ],
    []
  );

  // Initialize the table
  const [openModal, setOpenModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [modalType, setModalType] = useState('');

  const handleOpenModal = (ticket, type) => {
    setSelectedTicket(ticket);
    setModalType(type);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTicket(null);
    setModalType('');
  };

  const handleConfirm = async () => {
    try {
      let apiUrl = '';
      if (modalType === 'handle') {
        apiUrl = '/api/v1/tickets/status';
      } else if (modalType === 'cancel') {
        apiUrl = '/api/v1/tickets/cancel';
      }

      const response = await axiosInstance.patch(apiUrl, {
        ticket_id: selectedTicket.ticket_id,
        ticket_status_id: modalType === 'handle' ? 2 : 4,
      });

      

      console.log('Handle action', response.data);
      onTicketCardUpdate(); // Notify parent component to refresh TicketCard
      handleCloseModal();
      localStorage.removeItem('ticketIdSelected');
      
      // run the handle refresh function
      handleRefresh();

    } catch (error) {
      console.error('Error handling ticket:', error);
      onTicketCardUpdate(); // Notify parent component to refresh TicketCard
      handleCloseModal();
    }
  };

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
        <Tooltip title="View">
          <IconButton
            onClick={() => {
              console.log('View action', row.original);
              localStorage.setItem('ticketIdSelected', row.original.ticket_id);

              onTicketCardUpdate(); // Notify parent component to refresh TicketCard
            }}
          >
            <Visibility />
          </IconButton>
        </Tooltip>

        <Tooltip title="Handle">
          <IconButton
            onClick={() => handleOpenModal(row.original, 'handle')}
          >
            <BuildIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Cancel">
          <IconButton
            onClick={() => handleOpenModal(row.original, 'cancel')}
          >
            <CancelIcon />
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

  return (
    <Box>
          <Button
          variant="contained"
          color="success"
          onClick={
            handleRefresh // Toggle the state to trigger a re-render
          }
          sx={{ mb: 2 }}
          >
          <IconReload />
          <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
            Refresh
        </Typography>
        </Button>


      <MaterialReactTable table={table} />
      {openModal && selectedTicket && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{ ...modalStyle }}>
            <IconButton
              sx={{ position: 'absolute', top: 8, right: 8 }}
              onClick={handleCloseModal}
            >
              <CloseIcon />
            </IconButton>
            
            <Typography id="modal-title" variant="h4" component="h2">
              {modalType === 'handle' ? 'Are you sure you want to handle this ticket?' : 'Are you sure you want to cancel this ticket?'}
            </Typography>

            <Typography id="modal-title" variant="body1" component="h2" sx={{ mt: 1}}>
              Ticket #{selectedTicket.ticket_id}
            </Typography>

            <Typography id="modal-title" variant="body1" component="h2" sx={{ mt: 1}}>
              Subject: {selectedTicket.subject}
            </Typography>

            <Typography id="modal-title" variant="body1" component="h2" sx={{ mt: 1}}>
              Student: {selectedTicket.fullname}. ID: {selectedTicket.username}
            </Typography>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <Button variant="contained" color="primary" onClick={handleConfirm}
              sx={{
                backgroundColor: '#f7984c', // Custom default color
                '&:hover': {
                    backgroundColor: '#f58427', // Custom hover color
                },
              }}
              >
                OK
              </Button>
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default TicketsListCard;