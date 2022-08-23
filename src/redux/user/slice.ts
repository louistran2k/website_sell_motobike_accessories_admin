import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { User, UserState } from 'types/user.type';
import {
  ACCESS_TOKEN_KEY,
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from 'utils/storage';
import { AdminSignIn, ShipperSignIn } from './thunkActions';

export const userInit: User = {
  id: '',
  firstName: '',
  lastName: '',
  gender: null,
  dateOfBirth: null,
  address: '',
  phoneNumber: '',
  email: '',
};

export const initialState: UserState = {
  adminAccessToken:
    getAccessToken(ACCESS_TOKEN_KEY.ADMIN) !== null
      ? JSON.parse(getAccessToken(ACCESS_TOKEN_KEY.ADMIN) as string).accessToken
      : null,
  admin:
    getAccessToken(ACCESS_TOKEN_KEY.ADMIN) !== null
      ? JSON.parse(getAccessToken(ACCESS_TOKEN_KEY.ADMIN) as string).user
      : userInit,
  shipperAccessToken:
    getAccessToken(ACCESS_TOKEN_KEY.SHIPPER) !== null
      ? JSON.parse(getAccessToken(ACCESS_TOKEN_KEY.SHIPPER) as string)
          .accessToken
      : null,
  shipper:
    getAccessToken(ACCESS_TOKEN_KEY.SHIPPER) !== null
      ? JSON.parse(getAccessToken(ACCESS_TOKEN_KEY.SHIPPER) as string).user
      : userInit,
};

const userSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    adminLogout: (state) => {
      removeAccessToken(ACCESS_TOKEN_KEY.ADMIN);
      Object.assign(state, initialState);
      state.adminAccessToken = null;
    },
    shipperLogout: (state) => {
      removeAccessToken(ACCESS_TOKEN_KEY.SHIPPER);
      Object.assign(state, initialState);
      state.shipperAccessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AdminSignIn.fulfilled, (state, { payload }) => {
        state.adminAccessToken = payload.data.accessToken;
        setAccessToken(payload.data, ACCESS_TOKEN_KEY.ADMIN);
        state.admin = { ...payload.data.user };
      })
      .addCase(AdminSignIn.rejected, () => {
        toast.error('Tài khoản không hợp lệ!');
      });
    builder
      .addCase(ShipperSignIn.fulfilled, (state, { payload }) => {
        state.shipperAccessToken = payload.data.accessToken;
        setAccessToken(payload.data, ACCESS_TOKEN_KEY.SHIPPER);
        state.shipper = { ...payload.data.user };
      })
      .addCase(ShipperSignIn.rejected, () => {
        toast.error('Tài khoản không hợp lệ!');
      });
  },
});

const { reducer: userReducer } = userSlice;
const { adminLogout, shipperLogout } = userSlice.actions;

export default userReducer;
export { adminLogout, shipperLogout };
