import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Grid, TextField, Button, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

import LoginLogo from 'views/roles/staff/ui-component/LoginLogo';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setIsButtonDisabled(true);
    axios.post(`http://localhost:3000/auth/reset-password`, { email: email })
      .then(response => {
        toast.success('Password reset link sent to your email', { containerId: "reset-password-toast" });
      })
      .catch(error => {
        toast.error('There was an error sending the reset link', { containerId: "reset-password-toast" });
        console.error('There was an error sending the reset link:', error);
      })
      .finally(() => {
        setLoading(false);
        setIsButtonDisabled(false);
        // setTimeout(() => {
          
        // }, 5000); // Match the toast autoClose duration
      });
  };

  return (
    <>

    <Modal
        open={loading}
        closeAfterTransition
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress sx={{ color: 'orange' }} />
        </Box>
    </Modal>

    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <IconButton onClick={() => navigate('/login')}>
            <ArrowBackIcon />
          </IconButton>
        </Grid>

        <Grid item xs={12} sx={{ mb: 3 }} container justifyContent="center">
          <Link to="/" aria-label="logo">
            <LoginLogo />
          </Link>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" component="div" gutterBottom>
            Forgot Password
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isButtonDisabled}
            sx={{
              backgroundColor: isButtonDisabled ? '#d3d3d3' : '#f7984c', // Grey out when disabled
              '&:hover': {
                backgroundColor: isButtonDisabled ? '#d3d3d3' : '#f58427', // Custom hover color
              },
            }}
          >
            Reset Password
          </Button>
        </Grid>
      </Grid>

      <ToastContainer containerId={"reset-password-toast"}
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
    </form>
    </>
  );
};

export default ForgotPassword;