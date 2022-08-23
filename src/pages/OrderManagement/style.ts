import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  container: {
    height: 'calc(100% - 48px)',
    overflowY: 'auto',
  },
  detail: {
    overflowY: 'auto',
    postion: 'relative',
    '& > div > div': {
      width: 888,
      height: 550,
      maxWidth: 'unset !important',
      padding: 20,
    },
  },
  customer: {
    marginTop: 10,
  },
  btnClose: {
    top: 20,
    right: 20,
  }
});
