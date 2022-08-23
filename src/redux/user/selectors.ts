import { RootState } from 'redux/store';

export const adminAccessTokenSelector = (state: RootState) =>
  state.userReducer.adminAccessToken;

export const getAdmin = (state: RootState) => state.userReducer.admin;

export const shipperAccessTokenSelector = (state: RootState) =>
  state.userReducer.shipperAccessToken;

export const getShipper = (state: RootState) => state.userReducer.shipper;
