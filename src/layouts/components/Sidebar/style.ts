import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  'left-sidebar': {
    position: 'relative',
    'z-index': '999 !important',

    '& a': {
      textDecoration: 'none',
      color: 'var(--text-color-2)',
    },

    '& span': {
      position: 'relative',
      left: '-20px',
      fontSize: '14px',
      fontWeight: 700,
    },

    '& nav': {
      marginTop: 'var(--header-height)',
      width: 'var(--sidebar-width)',
    }
  },
  active: {
    '& span': {
      color: 'var(--primary-color) !important',
    },
  },
});
