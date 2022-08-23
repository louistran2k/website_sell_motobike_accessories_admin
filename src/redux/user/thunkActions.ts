import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from 'api/axiosClient';
import { LoginRequest } from 'types/user.type';

export const AdminSignIn = createAsyncThunk(
  'user/adminSignIn',
  async ({ username, password }: LoginRequest) => {
    try {
      const res = await axiosClient.post('api/account/admin/sign-in', {
        username,
        password,
      });
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
export const ShipperSignIn = createAsyncThunk(
  'user/shipperSignIn',
  async ({ username, password }: LoginRequest) => {
    try {
      const res = await axiosClient.post('api/account/shipper/sign-in', {
        username,
        password,
      });
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
