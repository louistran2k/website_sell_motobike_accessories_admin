import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClientAdmin, axiosClientShipper } from 'api/axiosClient';

export const getStaffsAsync = createAsyncThunk('staff/getAll', async () => {
  try {
    const res = await axiosClientAdmin.get('api/staff/getAll');
    return res;
  } catch (errors) {
    throw new Error(String(errors));
  }
});
export const getStaffsForDeliveryAsync = createAsyncThunk(
  'staff/getAllForDelivery',
  async () => {
    try {
      const res = await axiosClientShipper.get('api/staff/getAll');
      return res;
    } catch (errors) {
      throw new Error(String(errors));
    }
  }
);
export const getShippersAsync = createAsyncThunk('staff/getAll', async () => {
  try {
    const res = await axiosClientAdmin.get('api/staff/getAllShipper');
    return res;
  } catch (errors) {
    throw new Error(String(errors));
  }
});
