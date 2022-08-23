import { Outlet } from 'react-router-dom';
import { useStyles } from './style';
import { LogoImg } from 'assets/images';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function Authentication() {
  const classes = useStyles();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={false}
      />
      <div className={classes.authentication}>
        <div className={classes['login-form']}>
          <img src={LogoImg} />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Authentication;
