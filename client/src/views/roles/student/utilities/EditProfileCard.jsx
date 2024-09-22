import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';

import SubCard from '../ui-component/cards/SubCard';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axiosInstance from 'api/axiosInstance';
import context from 'context';

const EditProfileCard = ({ onProfileUpdate }) => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const recaptchaRef = React.createRef();

  const onCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must only contain digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number can't exceed 15 digits")
      .required("Phone number is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!captchaVerified) {
      toast.error("Please verify the captcha!");
      return;
    }

    const apiUrl = context.serverBaseUrl + context.apiEndpoint.userApi.editProfileApi;

    try {
      const response = await axiosInstance.patch(apiUrl, {
        newPhoneNumber: values.phoneNumber,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        resetForm();
        recaptchaRef.current.reset();
        setCaptchaVerified(false);

        // Trigger the profile update callback
        onProfileUpdate(); // Notify parent component to refresh ProfileCard
      }
    } catch (error) {
      toast.error(`${error.response.data.message}. Please try again.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SubCard title="Change Phone Number">
      <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
        <Formik
          initialValues={{
            phoneNumber: '',
          }}
          validationSchema={validationSchema} // Add the Yup validation schema
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, values, isSubmitting, errors, touched }) => (
            <Form>
              {/* Phone Number Field */}
              <Box mb={3}>
                <TextField
                  fullWidth
                  type="text"
                  name="phoneNumber"
                  label="Enter your new phone number"
                  variant="outlined"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Box>

              <Box mb={2} display="flex" justifyContent="left">
                <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'center' }} gutterBottom align='center'>
                    Verify that you are not a robot:
                </Typography>
              </Box>

              {/* reCAPTCHA */}
              <Box mb={3} display="flex" justifyContent="center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={context.googleCaptchaSiteKey}
                  onChange={onCaptchaChange}
                />
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || !captchaVerified}
                sx={{
                    backgroundColor: '#f7984c', // Custom default color
                    '&:hover': {
                      backgroundColor: '#f58427', // Custom hover color
                    },
                }}
              >
                Change Phone Number
              </Button>
            </Form>
          )}
        </Formik>
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
    </SubCard>
  );
};

export default EditProfileCard;
