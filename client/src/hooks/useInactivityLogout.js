import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice'; // Assuming you have a logout action in authSlice

const useInactivityLogout = (timeout = 10000) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      // Clear the existing timer if there's any user activity
      if (timer) {
        clearTimeout(timer);
      }
      // Set a new timer based on the specified timeout duration
      timer = setTimeout(() => {
        handleLogout();
      }, timeout); // Timeout can be passed as an argument
    };

    const handleLogout = () => {
      dispatch(logout()); // Dispatch the logout action
      navigate('/login'); // Navigate to the login page
    };

    // Add event listeners to detect user activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    // Start the inactivity timer when the hook is used
    resetTimer();

    // Clean up event listeners and timer when the hook is no longer needed
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [dispatch, navigate, timeout]);
};

export default useInactivityLogout;
