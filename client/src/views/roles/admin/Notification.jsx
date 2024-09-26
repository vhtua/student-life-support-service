import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  IconButton,
  Typography,
  Modal,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { IconReload, IconX, IconCirclePlus } from '@tabler/icons-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../../api/axiosInstance';
import { gridSpacing } from 'store/constant';
import NotificationCard from './utilities/NotificationCard';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Notification = () => {
  const [notificationCardUpdate, setNotificationCardUpdate] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleNotificationCardUpdate = () => {
    setNotificationCardUpdate((prevState) => !prevState);
  };

  useEffect(() => {
    axiosInstance.get('/api/v1/notification')
      .then((response) => {
        setNotificationData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [notificationCardUpdate]);

  useEffect(() => {
    axiosInstance.get('/api/v1/roles')
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    // alert(JSON.stringify(values, null, 2));
    axiosInstance.post('/api/v1/notification', values)
      .then((response) => {
        toast.success(response.data.message, { containerId: 'staff-notification' });
        // alert(response.data.message);
        handleNotificationCardUpdate();
        setOpenModal(false);
      })
      .catch((error) => {
        toast.error('There was an error sending the notification', { containerId: 'staff-notification' });
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    recipients: Yup.array().min(1, 'At least one recipient is required').required('Recipients are required'),
    content: Yup.string().required('Content is required'),
  });

  return (
    <Grid container spacing={gridSpacing}>
      <ToastContainer containerId={'staff-notification'}
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

      <Grid item xs={12} sm={12}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#5bbaea', mb: 2 }}
          onClick={() => {
            handleNotificationCardUpdate();
            setNotificationData([]);
          }}
        >
          <IconReload />
          <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
            Refresh
          </Typography>
        </Button>

        <Button
          variant="contained"
          color='success'
          sx={{ mb: 2, ml: 2 }}
          onClick={() => setOpenModal(true)}
        >
          <IconCirclePlus />
          <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
            Create
          </Typography>
        </Button>
      </Grid>

      {notificationData.map((eachNotification) => (
        <Grid item xs={12} sm={12} key={eachNotification.id}>
          <NotificationCard notification={eachNotification} handleNotificationCardUpdate={notificationCardUpdate} />
        </Grid>
      ))}

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <IconButton
            aria-label="close"
            onClick={() => setOpenModal(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <IconX />
          </IconButton>
          <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
            Create A Notification
          </Typography>
          <Formik
            initialValues={{ title: '', recipients: [], content: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values, errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  name="title"
                  label="Title"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={2}
                  error={touched.title && Boolean(errors.title)}
                  helperText={<ErrorMessage name="title" />}
                />
                <Field
                  as={TextField}
                  name="recipients"
                  label="Recipients"
                  select
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) => selected.map((value) => roles.find((role) => role.role_id === value)?.role_name).join(', '),
                  }}
                  onChange={(event) => {
                    setFieldValue('recipients', event.target.value);
                  }}
                  error={touched.recipients && Boolean(errors.recipients)}
                  helperText={<ErrorMessage name="recipients" />}
                >
                  {roles
                    .filter((role) => role.role_name !== localStorage.getItem("roleName"))
                    .map((role) => (
                      <MenuItem key={role.role_id} value={role.role_id}>
                        <Checkbox checked={values.recipients.includes(role.role_id)} />
                        <ListItemText primary={role.role_name} />
                      </MenuItem>
                    ))}
                </Field>
                <Field
                  as={TextField}
                  name="content"
                  label="Content"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={12}
                  error={touched.content && Boolean(errors.content)}
                  helperText={<ErrorMessage name="content" />}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2,
                    backgroundColor: '#f7984c', // Custom default color
                    '&:hover': {
                        backgroundColor: '#f58427', // Custom hover color
                    },
                   }}
                  fullWidth
                  disabled={isSubmitting}
                >
                  Send
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Notification;