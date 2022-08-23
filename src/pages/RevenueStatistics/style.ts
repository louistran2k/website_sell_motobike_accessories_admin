import { Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      textAlign: 'center',
      marginTop: 50,
      overflowY: 'auto',
      paddingBottom: 100,

      '& td': {
        border: '1px solid rgba(0,0,0,0.5)',
      },
      '& th': {
        border: '1px solid rgba(0,0,0,0.5)',
      },
    },
    sign: {
      display: 'inline-block',
      marginTop: 40,
      marginLeft: 450,
      marginBottom: 50,
    },
  })
);
