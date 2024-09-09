// material-ui
import { useTheme } from '@mui/material/styles';
import { textAlign } from '@mui/system';

import logo from 'assets/images/logo.png';

// ==============================|| LOGO SVG ||============================== //

const LoginLogo = () => {
  const theme = useTheme();

  return (
    <img src={logo} alt="vgu-sls-service-logo" width="310" height="40" />
  );
};

export default LoginLogo;
