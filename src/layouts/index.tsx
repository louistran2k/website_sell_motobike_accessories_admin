import { Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useStyles } from './style';

import 'react-toastify/dist/ReactToastify.css';

type Props = {
  children: JSX.Element;
};

const AdminLayout = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Sidebar />
      <Container disableGutters className={classes.content}>
        {children}
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={false}
      />
    </>
  );
};

export default AdminLayout;
