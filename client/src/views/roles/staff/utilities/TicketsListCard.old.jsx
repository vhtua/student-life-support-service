import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

import {
  Box,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';

import { Visibility, Edit, Delete } from '@mui/icons-material';

const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
    status: 10000
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  // more data...
];

const TicketsListCard = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName',
        header: 'First Name',
        size: 100,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 100,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 100,
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 100,
      },
      {
        accessorKey: 'status',
        // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
        // filterFn: 'between',
        header: 'Status',
        size: 100,
        //custom conditional format and styling
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor:
                cell.getValue() < 50_000
                  ? theme.palette.error.dark // "#f5821f"
                  : cell.getValue() >= 50_000 && cell.getValue() < 75_000
                    ? theme.palette.warning.dark
                    : theme.palette.success.dark,
              borderRadius: '0.25rem',
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
          </Box>
        ),
      },

    //   {
    //     accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
    //     id: 'startDate',
    //     header: 'Start Date',
    //     filterVariant: 'date',
    //     filterFn: 'lessThan',
    //     sortingFn: 'datetime',
    //     Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
    //     Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
    //     muiFilterTextFieldProps: {
    //       sx: {
    //         minWidth: '250px',
    //       },
    //     },
    //   },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    positionActionsColumn: 'last', // Ensure actions column is placed last
    enableBottomToolbar: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enablePagination: false,
    enableRowActions: true, // Enable row actions
    muiTableContainerProps: { sx: { maxHeight: '400px' } },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <Tooltip title="View">
          <IconButton
            onClick={() => {
              console.log('View action', row.original);
            }}
          >
            <Visibility />
          </IconButton>
        </Tooltip>
        {/* <IconButton
          onClick={() => {
            console.log('Edit action', row.original);
          }}
        >
          <Edit />
        </IconButton>
        <IconButton
          onClick={() => {
            console.log('Delete action', row.original);
          }}
        >
          <Delete />
        </IconButton> */}
      </Box>
    ),
    muiTableBodyRowProps: ({ rowIndex }) => ({
      sx: {
        backgroundColor:
          rowIndex % 2 === 0 ? '#f5821f' : '#ffffff', // Apply striped effect using rowIndex
      },
    }),
  });

  return (
    <Box>
      {/* Title above the table */}
      <Typography variant="h2" component="h2" sx={{ mb: 2 }}>
        Ticket List
      </Typography>
      
      {/* Render the table */}
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default TicketsListCard;
