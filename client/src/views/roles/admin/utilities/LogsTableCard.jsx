import { useMemo, useEffect, useState } from 'react';
import axiosInstance from 'api/axiosInstance';
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
  Chip,
} from '@mui/material';
import { Delete, Visibility, Edit } from '@mui/icons-material';
import { IconReload, IconFileTypeCsv, IconFileSpreadsheet, IconFileTypePdf, IconTrash } from '@tabler/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

const eventSeverity = {
  info: 1,
  error: 3,
  critical: 4,
  security: 5,
  audit: 6,
};

const eventColors = {
  info: 'green',
  error: 'orange',
  critical: 'red',
  security: 'purple',
  audit: 'blue',
};

const LogsTableCard = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [isRefresh, setRefresh] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleRefresh = () => {
    setRefresh((prevState) => !prevState); // Toggle the state to trigger a re-render
    setData([]); // Clear the data to show loading spinner
  };

  // Fetch data from API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/logs');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, [isRefresh]);

  // Define the columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'log_id',
        header: 'Log ID',
        size: 50,
      },
      {
        accessorKey: 'event_type_name',
        header: 'Event Type',
        size: 100,
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue()}
            sx={{
              backgroundColor: eventColors[cell.getValue()],
              color: '#fff',
            }}
          />
        ),
      },
      {
        accessorKey: 'timestamp',
        header: 'Timestamp',
        size: 150,
        Cell: ({ cell }) => format(new Date(cell.getValue()), 'yyyy-MM-dd HH:mm:ss'),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 200,
      },
      {
        accessorKey: 'username',
        header: 'Username',
        size: 100,
      },
      {
        accessorKey: 'fullname',
        header: 'Full Name',
        size: 150,
      },
      {
        accessorKey: 'role_name',
        header: 'Role',
        size: 100,
      },
    ],
    []
  );

  const handleClose = () => {
    setOpen(false);
    setSelectedLog(null);
  };

  const handleDelete = async () => {
    try {
      const url = `/api/v1/logs/${selectedLog?.log_id}`;
      await axiosInstance.delete(url);
      toast.success('Log deleted successfully');
      handleRefresh();
      handleClose();
    } catch (error) {
      console.error('Error deleting log:', error);
      toast.error('Failed to delete log');
    }
  };

  const exportToCSV = () => {
    const csvData = data.map((log) => ({
      log_id: log.log_id,
      event_type_name: log.event_type_name,
      timestamp: format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss'),
      description: log.description,
      username: log.username,
      fullname: log.fullname,
      role_name: log.role_name,
    }));
    return csvData;
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Log ID', 'Event Type', 'Timestamp', 'Description', 'Username', 'Full Name', 'Role']],
      body: data.map((log) => [
        log.log_id,
        log.event_type_name,
        format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss'),
        log.description,
        log.username,
        log.fullname,
        log.role_name,
      ]),
    });
    doc.save('logs.pdf');
  };

  const exportToExcel = () => {
    const formattedData = data.map((log) => ({
      log_id: log.log_id,
      event_type_name: log.event_type_name,
      timestamp: format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss'),
      description: log.description,
      username: log.username,
      fullname: log.fullname,
      role_name: log.role_name,
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Logs');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, 'logs.xlsx');
  };

  const handleRemoveAllLogs = () => {
    setOpenConfirmModal(true);
  };

  const confirmRemoveAllLogs = async () => {
    try {
      const url = `/api/v1/logs`;
      await axiosInstance.delete(url);
      toast.success('All logs deleted successfully');
      handleRefresh();
      setOpenConfirmModal(false);
    } catch (error) {
      console.error('Error deleting logs:', error);
      toast.error('Failed to delete logs');
    }
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  // Initialize the table
  const table = useMaterialReactTable({
    columns,
    data,
    enablePagination: true,
    initialState: { 
        pagination: { pageSize: 50 },
        columnPinning: { right: ['mrt-row-actions'] }, 
    },
    muiTablePaginationProps: {
      rowsPerPageOptions: [50],
    },
    muiTableContainerProps: { sx: { maxHeight: '600px' } },
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              setSelectedLog(row.original);
              setOpen(true);
            }}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return (
    <Box>
      <Box sx={{ display: 'block', gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleRefresh}
          sx={{ backgroundColor: '#5bbaea',
            ml: 1,
            mt: 1,
           }}
        >
          <IconReload />
          <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
            Refresh
          </Typography>
        </Button>

        <CSVLink data={exportToCSV()} filename="logs.csv">
          <Button variant="contained" color="warning" sx={{
                ml: 1,
                mt: 1,
            }} >
            <IconFileTypeCsv />
            <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
            Export to CSV
          </Typography>
          </Button>
        </CSVLink>

        <Button variant="contained" color="warning" onClick={exportToPDF} 
        sx={{
            ml: 1,
            mt: 1,
        }}>
            <IconFileTypePdf />
            <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
            Export to PDF
          </Typography>
        </Button>

        <Button variant="contained" color="warning" onClick={exportToExcel}
        sx={{
            ml: 1, mt: 1,
        }}>
            <IconFileSpreadsheet />
          <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
            Export to Excel
          </Typography>
        </Button>

        <Button variant="contained" color="error" onClick={handleRemoveAllLogs}
        sx={{
            ml: 1, mt: 1,
        }}>
            <IconTrash />
          <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
            Remove all logs
          </Typography>
        </Button>

      </Box>

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
          <Typography variant="h3" component="h2">
            Confirm Delete
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete the log with ID {selectedLog?.log_id}?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handleDelete} 
            sx={{
                mr: 2,
                backgroundColor: '#f7984c', // Custom default color
                '&:hover': {
                    backgroundColor: '#f58427', // Custom hover color
                },
            }}
            >
              Confirm
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openConfirmModal} onClose={handleCloseConfirmModal}>
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
          <Typography variant="h3" component="h2">
            Confirm Delete All Logs
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete all logs?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button variant="contained" color="primary" onClick={confirmRemoveAllLogs} 
            sx={{
                mr: 2,
                backgroundColor: '#f7984c', // Custom default color
                '&:hover': {
                    backgroundColor: '#f58427', // Custom hover color
                },
            }}
            >
              Confirm
            </Button>
            <Button variant="outlined" onClick={handleCloseConfirmModal}>
              Cancel
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

export default LogsTableCard;