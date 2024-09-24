import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

// For alert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from 'api/axiosInstance';


const FeedbackSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Feedback content is required'),
});





const FeedbackCard = () => {
    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        const feedbackData = {
            title: values.title,
            content: values.content,
            created_date: new Date().toISOString(),
        };

        axiosInstance.post('/api/v1/feedback', feedbackData)
            .then(response => {
                console.log('Feedback submitted successfully:', response.data);
                toast.success('Feedback submitted successfully');
                resetForm();
            })
            .catch(error => {
                toast.error('There was an error submitting the feedback');
                console.error('There was an error submitting the feedback:', error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h4" component="div" gutterBottom>
                    Share your feedback with us
                </Typography>
                <Formik
                    initialValues={{ title: '', content: '' }}
                    validationSchema={FeedbackSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <div>
                                <Field
                                    name="title"
                                    as={TextField}
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={touched.title && !!errors.title}
                                    helperText={touched.title && errors.title}
                                />
                            </div>
                            <div>
                                <Field
                                    name="content"
                                    as={TextField}
                                    label="Feedback Details"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={10}
                                    error={touched.content && !!errors.content}
                                    helperText={touched.content && errors.content}
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                sx={{
                                    backgroundColor: '#f7984c', // Custom default color
                                    '&:hover': {
                                        backgroundColor: '#f58427', // Custom hover color
                                    },
                                }}
                            >
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </CardContent>

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
        </Card>
    );
};

export default FeedbackCard;