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
  Button
} from '@mui/material';

import { IconReload } from '@tabler/icons-react';

import { Visibility } from '@mui/icons-material';

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
        const apiUrl = context.apiEndpoint.ticketApi.rootApi + "/" + username;

        const response = await axiosInstance.get(apiUrl);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, [isRefresh]);
  

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
    ],
    []
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
      </Box>
    ),
    muiTableBodyRowProps: ({ rowIndex }) => ({
      sx: {
        backgroundColor: rowIndex % 2 === 0 ? '#f5821f' : '#ffffff',
      },
    }),
  });

  return (
    <Box>{/* Refresh button */}
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
      {/* <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
        Ticket List
      </Typography> */}

      <MaterialReactTable table={table} />
    </Box>
  );
};

export default TicketsListCard;
