import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';

// project imports
import config from 'config';
import Logo from 'views/roles/student/ui-component/Logo';
import { MENU_OPEN } from 'store/actions';
import validateUserRole from 'views/utilities/validateUserRole';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={validateUserRole.navigateRouteByUserRole(localStorage.getItem("roleName"))}>
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
