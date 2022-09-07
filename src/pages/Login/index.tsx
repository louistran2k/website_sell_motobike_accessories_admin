import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Typography,
  Grid,
  TextField,
  Button,
  InputAdornment,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { Person, Https, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginRequest } from 'types/user.type';
import { useStyles } from './style';
import { adminSignIn, shipperSignIn } from 'redux/user/thunkActions';

const schema = yup.object().shape({
  username: yup.string().label('Username').required(),
  password: yup.string().label('Password').required().min(6).max(20),
});

function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: LoginRequest) => {
    if (location.pathname.includes('shipper')) {
      const res = await dispatch(shipperSignIn(data));
      if (res.payload) {
        navigate('/shipper/app/delivery');
      }
    } else {
      const res = await dispatch(adminSignIn(data));
      if (res.payload) {
        navigate('/admin/app/orders');
      }
    }
  };
  const usernameRegister = register('username');
  const passwordRegister = register('password');

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h3">Log in</Typography>
      <div className={classes['form-control']}>
        <Person />
        <TextField
          type="text"
          className={classes['form-control__input']}
          label="Username"
          color="secondary"
          required
          variant="standard"
          {...usernameRegister}
          error={!!errors.username}
          helperText={errors.username?.message ?? ''}
        />
      </div>
      <div className={classes['form-control']}>
        <Https />
        <TextField
          className={classes['form-control__input']}
          type={showPassword ? 'type' : 'password'}
          label="Password"
          color="secondary"
          required
          variant="standard"
          {...passwordRegister}
          error={!!errors.password}
          helperText={errors.password?.message ?? ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? (
                  <VisibilityOff onClick={handleShowPassword} />
                ) : (
                  <Visibility onClick={handleShowPassword} />
                )}
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Button
        variant="contained"
        type="submit"
        fullWidth
        className={classes['btn-login']}
        disableRipple={true}
        disableElevation
        disabled={!isValid}
      >
        Log in
      </Button>
    </form>
  );
}

export default Login;
