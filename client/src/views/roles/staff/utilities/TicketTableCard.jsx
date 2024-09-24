// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'views/roles/student/ui-component/cards/MainCard';
import TicketsTable from './TicketsTable';

// ==============================|| SAMPLE PAGE ||============================== //

const HowToUseCard = () => (
  <MainCard title="Ticket Table">
    <TicketsTable/>
  </MainCard>
);

export default HowToUseCard;
