import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  authentication: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'var(--background-color)',
  },
  'login-form': {
    textAlign: 'center',
    color: 'var(--white-color)',

    '& form': {
      borderRadius: 10,
      boxShadow: '0 0 5px 2px rgba(0,0,0,0.2)',
    },

    '& h1': {
      fontSize: '36px',
      fontWeight: 400,
      color: 'var(--white-color)',
    },
  },
  'app-version': {
    fontSize: '12px',
    color: 'var(--white-color)',
  },
});
