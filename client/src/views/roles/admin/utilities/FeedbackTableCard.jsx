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
import { Delete, Visibility } from '@mui/icons-material';
import { IconReload } from '@tabler/icons-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';

const FeedbackTableCard = () => {
  const [data, setData] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isRefresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prevState) => !prevState); // Toggle the state to trigger a re-render
    setData([]); // Clear the data to show loading spinner
  };

  // Fetch data from API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/feedback');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, [isRefresh]);

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setSelectedFeedback(null);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedFeedback(null);
  };

  const handleView = async (feedbackId) => {
    try {
      const response = await axiosInstance.get(`/api/v1/feedback/${feedbackId}`);
      setSelectedFeedback(response.data);
      setOpenViewModal(true);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast.error('Failed to fetch feedback details');
    }
  };

  const handleDelete = async () => {
    try {
      const url = `/api/v1/feedback/${selectedFeedback?.feedback_id}`;
      await axiosInstance.delete(url);
      toast.success('Feedback deleted successfully');
      handleRefresh();
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Error deleting feedback:', error);
      toast.error('Failed to delete feedback');
    }
  };

  // Define the columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'feedback_id',
        header: 'Feedback ID',
        size: 50,
      },
      {
        accessorKey: 'title',
        header: 'Title',
        size: 200,
      },
      {
        accessorKey: 'rating_score',
        header: 'Rating Score',
        size: 100,
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue()}
            sx={{
              backgroundColor: cell.getValue() >= 4 ? 'green' : '#f5821f',
              color: '#fff',
            }}
          />
        ),
      },
      {
        accessorKey: 'created_date',
        header: 'Created Date',
        size: 150,
        Cell: ({ cell }) => format(new Date(cell.getValue()), 'yyyy-MM-dd HH:mm:ss'),
      },
    ],
    []
  );

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
        <Tooltip title="View">
          <IconButton
            onClick={() => handleView(row.original.feedback_id)}
          >
            <Visibility />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              setSelectedFeedback(row.original);
              setOpenDeleteModal(true);
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
      </Box>

      <MaterialReactTable table={table} />

      <Modal open={openViewModal} onClose={handleCloseViewModal}>
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
            Feedback Details
          </Typography>
          {selectedFeedback && (
            <>
              <Typography sx={{ mt: 2 }}>
                <strong>Title:</strong> {selectedFeedback.title}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Rating Score:</strong> {selectedFeedback.rating_score}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Created Date:</strong> {format(new Date(selectedFeedback.created_date), 'yyyy-MM-dd HH:mm:ss')}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Content:</strong> {selectedFeedback.content}
              </Typography>
            </>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button variant="outlined" onClick={handleCloseViewModal}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
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
            Are you sure you want to delete the feedback with ID {selectedFeedback?.feedback_id}?
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
            <Button variant="outlined" onClick={handleCloseDeleteModal}>
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

export default FeedbackTableCard;