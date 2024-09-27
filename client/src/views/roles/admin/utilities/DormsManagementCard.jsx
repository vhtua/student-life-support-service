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
  TextField,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { IconReload, IconCirclePlus } from '@tabler/icons-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DormsTable = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedDorm, setSelectedDorm] = useState(null);
  const [isRefresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prevState) => !prevState); // Toggle the state to trigger a re-render
    setData([]); // Clear the data to show loading spinner
  };

  // Fetch data from API
  useEffect(() => {
    const fetchDorms = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/dorms');
        const dormsData = response.data.flatMap(dorm => 
          dorm.rooms.map(room => ({
            dorm_area: dorm.dorm_area,
            dorm_room: room.dorm_room,
          }))
        );
        setData(dormsData);
      } catch (error) {
        console.error('Error fetching dorms:', error);
      }
    };

    fetchDorms();
  }, [isRefresh]);

  // Define the columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'dorm_area',
        header: 'Dorm Area',
        size: 100,
      },
      {
        accessorKey: 'dorm_room',
        header: 'Dorm Room',
        size: 100,
      },
    ],
    []
  );

  const handleClose = () => {
    setOpen(false);
    setSelectedDorm(null);
  };

  const handleDelete = async () => {
    try {
        const url = `/api/v1/dorms/${selectedDorm?.dorm_area}/${selectedDorm?.dorm_room}`;
        await axiosInstance.delete(url);
        toast.success('Dorm deleted successfully');
        handleRefresh();
        handleClose();
    } catch (error) {
        console.error('Error deleting dorm:', error);
        toast.error('Failed to delete dorm');
    }
  };

  const handleCreateDorm = async (values, { setSubmitting }) => {
    try {
      await axiosInstance.post('/api/v1/dorms', values);
      toast.success('Dorm created successfully');
      setOpenCreateModal(false);
      handleRefresh();
    } catch (error) {
      console.error('Error creating dorm:', error);
      toast.error(`Failed to create dorm: ${error.response?.data?.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    dorm_area: Yup.string().required('Dorm Area is required'),
    dorm_room: Yup.string().required('Dorm Room is required'),
  });

  // Initialize the table
  const table = useMaterialReactTable({
    columns,
    data,
    enableStickyHeader: true,
    enableStickyFooter: true,
    initialState: { pagination: { pageSize: 50 } },
    enablePagination: true,
    muiTablePaginationProps: {
      rowsPerPageOptions: [50],
    },
    muiTableContainerProps: { sx: { maxHeight: '600px' } },
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        {/* <Tooltip title="View">
          <IconButton
            onClick={() => {
              console.log('View action', row.original);
            }}
          >
            <Visibility />
          </IconButton>
        </Tooltip> */}
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              setSelectedDorm(row.original);
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
      <Button
        variant="contained"
        onClick={handleRefresh}
        sx={{ backgroundColor: '#5bbaea', mb: 2 }}
      >
        <IconReload />
        <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
          Refresh
        </Typography>
      </Button>

      <Button
        variant="contained"
        color="success"
        onClick={() => setOpenCreateModal(true)}
        sx={{ mb: 2, ml: 2 }}
      >
        <IconCirclePlus />
        <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
          Create a New Dorm
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
          <Typography variant="h3" component="h2">
            Confirm Delete
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete the dorm {selectedDorm?.dorm_area} - {selectedDorm?.dorm_room}?
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

      <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
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
            Create a New Dorm
          </Typography>
          <Formik
            initialValues={{ dorm_area: '', dorm_room: '' }}
            validationSchema={validationSchema}
            onSubmit={handleCreateDorm}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  name="dorm_area"
                  label="Dorm Area"
                  fullWidth
                  margin="normal"
                  error={Boolean(ErrorMessage.dorm_area)}
                  helperText={<ErrorMessage name="dorm_area" />}
                />
                <Field
                  as={TextField}
                  name="dorm_room"
                  label="Dorm Room"
                  fullWidth
                  margin="normal"
                  error={Boolean(ErrorMessage.dorm_room)}
                  helperText={<ErrorMessage name="dorm_room" />}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                  <Button type="submit" variant="contained" color="primary" 
                  disabled={isSubmitting} 
                  sx={{
                    mr: 2,
                    backgroundColor: '#f7984c', // Custom default color
                    '&:hover': {
                        backgroundColor: '#f58427', // Custom hover color
                    },
                }}>
                    Submit
                  </Button>
                  <Button variant="outlined" onClick={() => setOpenCreateModal(false)}>
                    Cancel
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
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

export default DormsTable;