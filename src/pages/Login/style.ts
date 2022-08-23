import { Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '360px',
      padding: theme.spacing(4),
      backgroundColor: 'var(--white-color)',
      color: 'var(--text-color-1)',
      margin: '24px 0',

      '& h3': {
        margin: '8px 0 30px',
      },

      '& svg': {
        fontSize: '18px',
      },

      '& input': {
        fontSize: '14px',
      },

      '& label': {
        fontSize: '14px',
      },
    },

    'form-control': {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: '32px',
      position: 'relative',

      '& svg': {
        marginRight: '12px',
        marginBottom: '3px',
      },

      '& p': {
        position: 'absolute',
        bottom: '-25px',
        left: 0,
        margin: 'unset',
      },
    },

    'form-control__input': {
      flex: 1,
      color: theme.palette.secondary.main,
    },

    'btn-login': {
      backgroundColor: theme.palette.primary.light,
      marginRight: '17px !important',
      cursor: 'pointer',
      marginTop: '30px !important',

      '& span': {
        color: 'var(--white-color)',
        fontWeight: 400,
        lineHeight: 1.7,
      },

      '&:active': {
        backgroundColor: 'var(--white-color) !important',
        '& span': {
          color: '#999',
        },
      },

      '&:disabled': {
        '& span': {
          color: 'rgba(0, 0, 0, 0.259)',
        },
      },
    },
  })
);
