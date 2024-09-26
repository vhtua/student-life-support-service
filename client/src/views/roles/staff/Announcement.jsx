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


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnnouncementCard from './utilities/AnnouncementCard';



const Announcement = () => {
  const [announcementCardUpdate, setAnnouncementCardUpdate] = useState(false);
  const [announcementData, setAnnouncementData] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const handleAnnouncementCardUpdate = () => {
    setAnnouncementCardUpdate((prevState) => !prevState);
  };

  useEffect(() => {
    axiosInstance.get('/api/v1/announcement')
      .then((response) => {
        setAnnouncementData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [announcementCardUpdate]);


  const handleSubmit = (values, { setSubmitting }) => {
    // alert(JSON.stringify(values, null, 2));
    axiosInstance.post('/api/v1/announcement', values)
      .then((response) => {
        toast.success(response.data.message, { containerId: 'staff-announcement' });
        // alert(response.data.message);
        handleAnnouncementCardUpdate();
        setOpenModal(false);
      })
      .catch((error) => {
        toast.error('There was an error sending the announcement', { containerId: 'staff-announcement' });
        console.error(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

  return (
    <Grid container spacing={gridSpacing}>
      <ToastContainer containerId={'staff-announcement'}
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
            handleAnnouncementCardUpdate();
            setAnnouncementData([]);
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

      {announcementData.map((eachAnnouncement) => (
        <Grid item xs={12} sm={12} key={eachAnnouncement.id}>
          <AnnouncementCard announcement={eachAnnouncement} handleAnnouncementCardUpdate={announcementCardUpdate} />
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
            Create An Announcement
          </Typography>
          <Formik
            initialValues={{ title: '', content: '' }}
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

export default Announcement;