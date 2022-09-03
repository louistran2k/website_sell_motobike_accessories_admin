import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from 'api/axiosClient';

export const getStaffsAsync = createAsyncThunk('staff/getAll', async () => {
  try {
    const res = await axiosClient.get('api/staff/getAll');
    return res;
  } catch (errors) {
    throw new Error(String(errors));
  }
});
export const getShippersAsync = createAsyncThunk('staff/getAll', async () => {
  try {
    const res = await axiosClient.get('api/staff/getAllShipper');
    return res;
  } catch (errors) {
    throw new Error(String(errors));
  }
});
