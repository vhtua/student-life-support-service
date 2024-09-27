import { useMemo, useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid
} from '@mui/material';
import { Formik, Form, Field } from 'formik';

import { Visibility } from '@mui/icons-material';
import BuildIcon from '@mui/icons-material/Build';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconReload, IconCirclePlus } from '@tabler/icons-react';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';

import axiosInstance from 'api/axiosInstance';

// For alert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// Define the validation schema for Create User Formik
const validationSchemaCreateUser = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  fullname: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  role_name: Yup.string().required('Role is required'),
  gender: Yup.string().required('Gender is required'),
  program: Yup.string().required('Program is required'),
  dorm_area: Yup.string().required('Dorm Area is required'),
  dorm_room: Yup.string().required('Dorm Room is required'),
  phone_number: Yup.string().required('Phone Number is required'),
  intake: Yup.string().required('Intake is required'),
  place_of_birth: Yup.string().required('Place of Birth is required'),
  date_of_birth: Yup.date().required('Date of Birth is required'),
});


const UsersListCard = ({ onUserCardUpdate }) => {
  const [data, setData] = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  const [dormAreas, setDormAreas] = useState([]);
  const [dormRooms, setDormRooms] = useState([]);
  const [roles, setRoles] = useState([]);

  const handleRefresh = () => {
    setRefresh((prevState) => !prevState); // Toggle the state to trigger a re-render
    setData([]); // Clear the data to show loading spinner
  };


  const handleCreateUser = async (values) => {
    try {
      alert(JSON.stringify(values, null, 2));
      const apiUrl = '/api/v1/users';
      await axiosInstance.post(apiUrl, values);
      toast.success('The user has been successfully created', { containerId: 'admin-users-toast' });
      onUserCardUpdate(); // Notify parent component to refresh UserCard
      handleCloseModal();
    } catch (error) {
      toast.error('Error creating user', { containerId: 'admin-users-toast' });
      console.error('Error creating user:', error);
    }
  };


  // Fetch data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = `/api/v1/users/all`;
        const response = await axiosInstance.get(apiUrl);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [isRefresh]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [areasResponse, rolesResponse] = await Promise.all([
          axiosInstance.get('/api/v1/dorms/areas'),
          axiosInstance.get('/api/v1/roles'),
        ]);
        setDormAreas(areasResponse.data);
        setRoles(rolesResponse.data);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

    fetchDropdownData();
  }, []);

  const fetchDormRooms = async (area) => {
    try {
      const response = await axiosInstance.get(`/api/v1/dorms/rooms/${area}`);
      setDormRooms(response.data);
    } catch (error) {
      console.error('Error fetching dorm rooms:', error);
    }
  };

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
        accessorKey: 'user_id',
        header: 'User ID',
        size: 30,
      },
      {
        accessorKey: 'username',
        header: 'Username',
        size: 150,
      },{
        accessorKey: 'fullname',
        header: 'Full Name',
        size: 200,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 200,
      },
      {
        accessorKey: 'role_name',
        header: 'Role',
        size: 100,
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        size: 50,
      },
      {
        accessorKey: 'created_date',
        header: 'Created Date',
        size: 100,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleString(),
      },
      {
        accessorKey: 'program',
        header: 'Program',
        size: 150,
      },
      {
        accessorKey: 'area',
        header: 'Area',
        size: 50,
      },
      {
        accessorKey: 'room',
        header: 'Room',
        size: 50,
      },
      {
        accessorKey: 'phone_number',
        header: 'Phone Number',
        size: 100,
      },
      {
        accessorKey: 'intake',
        header: 'Intake',
        size: 50,
      },
      {
        accessorKey: 'place_of_birth',
        header: 'Place of Birth',
        size: 150,
      },
      {
        accessorKey: 'date_of_birth',
        header: 'Date of Birth',
        size: 100,
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
    ],
    []
  );

  // Initialize the table
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState('');

  const handleOpenModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setModalType('');
  };

  const handleConfirm = async () => {
    try {
      if (modalType === 'delete') {
        const apiUrl = `/api/v1/users/${selectedUser.user_id}`;
        await axiosInstance.delete(apiUrl);
        toast.success('The user has been successfully deleted', { containerId: 'admin-users-mng-toast' });
        onUserCardUpdate(); // Notify parent component to refresh UserCard
        handleCloseModal();
        handleRefresh();
      }
    } catch (error) {
      toast.error('Error deleting this user', { containerId: 'admin-users-mng-toast' });
      console.error('Error deleting user:', error);
      onUserCardUpdate(); // Notify parent component to refresh UserCard
      handleCloseModal();
    }
  };


  const handleEditSubmit = async (values) => {

    try {
      if (modalType === 'editDorm') {
        const apiUrl = `/api/v1/users/dorm/${selectedUser.user_id}`;
        await axiosInstance.patch(apiUrl, values);
        toast.success('The user dorm has been successfully updated', { containerId: 'admin-users-mng-toast' });
        // onUserCardUpdate(); // Notify parent component to refresh UserCard
        handleCloseModal();
        handleRefresh();

      } else if (modalType === 'editRole') {
        alert(JSON.stringify(values, null, 2));
        const apiUrl = `/api/v1/users/role/${selectedUser.user_id}`;
        await axiosInstance.patch(apiUrl, values);
        toast.success('The user role has been successfully updated', { containerId: 'admin-users-mng-toast' });
        handleCloseModal();
        handleRefresh();
      }
    } catch (error) {
      toast.error('Error updating this user', { containerId: 'admin-users-mng-toast' });
      console.error('Error updating user:', error);
      onUserCardUpdate(); // Notify parent component to refresh UserCard
      handleCloseModal();
    }
    
  };

  const handlePersonalDetailsSubmit = async (values) => {
    alert(JSON.stringify(values, null, 2));
    try {
      const apiUrl = `/api/v1/user/personal-details/${selectedUser.user_id}`;
      await axiosInstance.patch(apiUrl, values);
      toast.success('The personal details have been successfully updated', { containerId: 'admin-users-mng-toast' });
      onUserCardUpdate(); // Notify parent component to refresh UserCard
      handleCloseModal();
      handleRefresh();
    } catch (error) {
      toast.error('Error updating personal details', { containerId: 'admin-users-mng-toast' });
      console.error('Error updating personal details:', error);
      onUserCardUpdate(); // Notify parent component to refresh UserCard
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
    initialState: {
      columnPinning: { right: ['mrt-row-actions'] },
    },
    muiTableContainerProps: { sx: { maxHeight: '800px' } },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <Tooltip title="Edit Dorm">
          <IconButton
            onClick={() => handleOpenModal(row.original, 'editDorm')}
          >
            <ApartmentIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit Role">
          <IconButton
            onClick={() => handleOpenModal(row.original, 'editRole')}
          >
            <PersonIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton
            onClick={() => handleOpenModal(row.original, 'delete')}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit Personal Details">
          <IconButton
            onClick={() => handleOpenModal(row.original, 'editPersonalDetails')}
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
    <Box>
      <ToastContainer containerId={"admin-users-mng-toast"}
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
        onClick={() => handleOpenModal(null, 'createUser')}
        color='success'
        sx={{ mb: 2, ml: 1 }}
      >
        <IconCirclePlus />
        <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
          Create a new user
        </Typography>
      </Button>

      <MaterialReactTable table={table} />

      {/* Handle modals */}
      {openModal && modalType === 'createUser' && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
      
      <Box sx={{ ...modalStyle, maxHeight: '90vh', overflowY: 'auto' }}>
  <IconButton
    sx={{ position: 'absolute', top: 8, right: 8 }}
    onClick={handleCloseModal}
  >
    <CloseIcon />
  </IconButton>

  {/* Create User Formik */}
  <Formik
    initialValues={{
      username: '',
      fullname: '',
      email: '',
      role_id: '',
      role_name: '',
      gender: '',
      program: '',
      dorm_area: '',
      dorm_room: '',
      phone_number: '',
      intake: '',
      place_of_birth: '',
      date_of_birth: '', // Format date for input
    }}
    // onSubmit={handleCreateUser}
    validationSchema={validationSchemaCreateUser}
    onSubmit={(values) => {
      const selectedRole = roles.find(role => role.role_name === values.role_name);
      const role_id = selectedRole ? selectedRole.role_id : null;
      handleCreateUser({ ...values, role_id });
    }}
  >
    {({ values, handleChange, setFieldValue, errors, touched }) => (
      <Form>
        <Typography id="modal-title" variant="h4" component="h2">
          Create User
        </Typography>
        <Grid container spacing={2}>
        <Grid item xs={6}>
          <Field
            as={TextField}
            label="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            as={TextField}
            label="Full Name"
            name="fullname"
            value={values.fullname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={touched.fullname && Boolean(errors.fullname)}
            helperText={touched.fullname && errors.fullname}
          />
        </Grid>
      </Grid>
      <Field
        as={TextField}
        label="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
      />
      <Field
        as={TextField}
        select
        label="Role"
        name="role_name"
        value={values.role_name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={touched.role_name && Boolean(errors.role_name)}
        helperText={touched.role_name && errors.role_name}
      >
        {roles.map((role) => (
          <MenuItem key={role.role_id} value={role.role_name}>
            {role.role_name}
          </MenuItem>
        ))}
      </Field>
      <Field
        as={TextField}
        select
        label="Gender"
        name="gender"
        value={values.gender}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={touched.gender && Boolean(errors.gender)}
        helperText={touched.gender && errors.gender}
      >
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
      </Field>
      <Field
        as={TextField}
        label="Program"
        name="program"
        value={values.program}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={touched.program && Boolean(errors.program)}
        helperText={touched.program && errors.program}
      />
      <Field
        as={TextField}
        select
        label="Dorm Area"
        name="dorm_area"
        value={values.dorm_area}
        onChange={async (e) => {
          handleChange(e);
          const area = e.target.value;
          setFieldValue('dorm_area', area);
          setFieldValue('dorm_room', ''); // Reset dorm room
          await fetchDormRooms(area);
        }}
        fullWidth
        margin="normal"
        error={touched.dorm_area && Boolean(errors.dorm_area)}
        helperText={touched.dorm_area && errors.dorm_area}
      >
        {dormAreas.map((area) => (
          <MenuItem key={area.dorm_area} value={area.dorm_area}>
            {area.dorm_area}
          </MenuItem>
        ))}
      </Field>
      <Field name="dorm_room">
        {({ field, form }) => (
          <Autocomplete
            {...field}
            options={dormRooms.map((room) => room.dorm_room)}
            getOptionLabel={(option) => option}
            value={field.value}
            onChange={(event, newValue) => {
              form.setFieldValue(field.name, newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Dorm Room"
                margin="normal"
                fullWidth
                disabled={!form.values.dorm_area}
                error={touched.dorm_room && Boolean(errors.dorm_room)}
                helperText={touched.dorm_room && errors.dorm_room}
              />
            )}
          />
        )}
      </Field>
      <Field
        as={TextField}
        label="Phone Number"
        name="phone_number"
        value={values.phone_number}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={touched.phone_number && Boolean(errors.phone_number)}
        helperText={touched.phone_number && errors.phone_number}
      />
      <Field
        as={TextField}
        label="Intake"
        name="intake"
        value={values.intake}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={touched.intake && Boolean(errors.intake)}
        helperText={touched.intake && errors.intake}
      />
      <Field
        as={TextField}
        label="Place of Birth"
        name="place_of_birth"
        value={values.place_of_birth}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={touched.place_of_birth && Boolean(errors.place_of_birth)}
        helperText={touched.place_of_birth && errors.place_of_birth}
      />
      <Field
        as={TextField}
        type="date"
        label="Date of Birth"
        name="date_of_birth"
        value={values.date_of_birth}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        error={touched.date_of_birth && Boolean(errors.date_of_birth)}
        helperText={touched.date_of_birth && errors.date_of_birth}
      />
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Box>
      </Form>
    )}
  </Formik>
</Box>
        </Modal>
      )}

      {openModal && selectedUser && (
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

            {modalType === 'delete' ? (
              <>
                <Typography id="modal-title" variant="h4" component="h2">
                  Are you sure you want to delete this user?
                </Typography>
                <Typography id="modal-title" variant="body1" component="h2" sx={{ mt: 1 }}>
                  User #{selectedUser.user_id}
                </Typography>
                <Typography id="modal-title" variant="body1" component="h2" sx={{ mt: 1 }}>
                  Full Name: {selectedUser.fullname}
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
              </>
            ) : modalType === 'editDorm' ? (
              <Formik
                initialValues={{
                  dorm_area: '',
                  dorm_room: '',
                }}
                onSubmit={handleEditSubmit}
              >
                {({ values, handleChange, setFieldValue }) => (
                  <Form>
                    <Typography id="modal-title" variant="h4" component="h2">
                      Edit Dorm
                    </Typography>
                    <Field
                      as={TextField}
                      select
                      label="Dorm Area"
                      name="dorm_area"
                      value={values.dorm_area}
                      onChange={async (e) => {
                        handleChange(e);
                        const area = e.target.value;
                        setFieldValue('dorm_area', area);
                        setFieldValue('dorm_room', ''); // Reset dorm room
                        await fetchDormRooms(area);
                      }}
                      fullWidth
                      margin="normal"
                    >
                      {dormAreas.map((area) => (
                        <MenuItem key={area.dorm_area} value={area.dorm_area}>
                          {area.dorm_area}
                        </MenuItem>
                      ))}
                    </Field>

                    {/* <Field
                      as={TextField}
                      select
                      label="Dorm Room"
                      name="dorm_room"
                      value={values.dorm_room}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      disabled={!values.dorm_area}
                    >
                      {dormRooms.map((room) => (
                        <MenuItem key={room.dorm_room} value={room.dorm_room}>
                          {room.dorm_room}
                        </MenuItem>
                      ))}
                    </Field>
                    */}
                        <Field
                          name="dorm_room"
                        >
                          {({ field, form }) => (
                            <Autocomplete
                              {...field}
                              options={dormRooms.map((room) => room.dorm_room)}
                              getOptionLabel={(option) => option}
                              value={field.value}
                              onChange={(event, newValue) => {
                                form.setFieldValue(field.name, newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Dorm Room"
                                  margin="normal"
                                  fullWidth
                                  disabled={!form.values.dorm_area}
                                />
                              )}
                            />
                          )}
                        </Field>

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                      <Button type="submit" variant="contained" color="primary"
                      sx={{
                        backgroundColor: '#f7984c', // Custom default color
                        '&:hover': {
                            backgroundColor: '#f58427', // Custom hover color
                        },
                       }}>
                        Save
                      </Button>
                      <Button variant="outlined" onClick={handleCloseModal}>
                        Cancel
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            ) : modalType === 'editRole' ? (
              <Formik
                initialValues={{
                  role_name: selectedUser.role_name,
                }}
                // onSubmit={
                //   handleEditSubmit
                // }

                onSubmit={(values) => {
                  const selectedRole = roles.find(role => role.role_name === values.role_name);
                  const role_id = selectedRole ? selectedRole.role_id : null;
                  handleEditSubmit({ role_id });
                }}
              >
                {({ values, handleChange }) => (
                 <Form>
                 <Typography id="modal-title" variant="h4" component="h2">
                   Edit Role
                 </Typography>
                 <Field
                   as={TextField}
                   select
                   label="Role"
                   name="role_name"
                   value={values.role_name}
                   onChange={handleChange}
                   fullWidth
                   margin="normal"
                 >
                   {roles.map((role) => (
                     <MenuItem key={role.role_id} value={role.role_name}>
                       {role.role_name} {/* Access role_name to display it as the label */}
                     </MenuItem>
                   ))}
                 </Field>
                 <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                   <Button type="submit" variant="contained" color="primary"
                   sx={{
                    backgroundColor: '#f7984c', // Custom default color
                    '&:hover': {
                        backgroundColor: '#f58427', // Custom hover color
                    },
                   }}>
                     Save
                   </Button>
                   <Button variant="outlined" onClick={handleCloseModal}>
                     Cancel
                   </Button>
                 </Box>
               </Form>
               
                )}
              </Formik>
            ) : (
              <Formik
                initialValues={{
                  fullname: selectedUser.fullname,
                  gender: selectedUser.gender,
                  program: selectedUser.program,
                  phone_number: selectedUser.phone_number,
                  intake: selectedUser.intake,
                  place_of_birth: selectedUser.place_of_birth,
                  date_of_birth: selectedUser.date_of_birth.split('T')[0], // Format date for input
                }}
                onSubmit={handlePersonalDetailsSubmit}
              >
                {({ values, handleChange }) => (
                  <Form>
                    <Typography id="modal-title" variant="h4" component="h2">
                      Edit Personal Details
                    </Typography>
                    <Field
                      as={TextField}
                      label="Full Name"
                      name="fullname"
                      value={values.fullname}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      as={TextField}
                      select
                      label="Gender"
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Field>
                    <Field
                      as={TextField}
                      label="Program"
                      name="program"
                      value={values.program}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      as={TextField}
                      label="Phone Number"
                      name="phone_number"
                      value={values.phone_number}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      as={TextField}
                      label="Intake"
                      name="intake"
                      value={values.intake}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      as={TextField}
                      label="Place of Birth"
                      name="place_of_birth"
                      value={values.place_of_birth}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                    />
                    <Field
                      as={TextField}
                      type="date"
                      label="Date of Birth"
                      name="date_of_birth"
                      value={values.date_of_birth}
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                      <Button type="submit" variant="contained" color="primary">
                        Save
                      </Button>
                      <Button variant="outlined" onClick={handleCloseModal}>
                        Cancel
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            )}
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default UsersListCard;