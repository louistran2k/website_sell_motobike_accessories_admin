import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  header: {
    height: 'var(--header-height)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 15px',
  },
  content: {
    marginTop: 'calc(var(--header-height) + 20px)',
    marginLeft: 'calc(var(--sidebar-width) + 20px) !important',
    width: 'calc(100vw - var(--sidebar-width) - 40px) !important',
    height: 'calc(100vh - var(--header-height) - 40px)',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    background: '#fff',
    padding: 15,
    overflowY: 'hidden',

    '& > div': {
      height: '100%',
    },

    '& .MuiInputBase-input': {
      width: '120px !important',
      padding: '10px !important',
      paddingRight: '32px !important',
    },

    '& .MuiTableCell-root': {
      padding: '8px 16px !important',
    },
  },
});
