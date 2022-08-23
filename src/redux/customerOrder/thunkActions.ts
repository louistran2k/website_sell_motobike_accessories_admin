import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from 'api/axiosClient';
import { CustomTimeType } from 'pages/RevenueStatistics';
import {
  UpdateRequest,
  CustomerOrderStatus,
  GetDeliveryRequest,
} from 'types/customerOrder.type';

export const getCustomerOrdersAsync = createAsyncThunk(
  'customerOrders/getAll',
  async (status: CustomerOrderStatus) => {
    try {
      const res = await axiosClient.get('api/customerOrder/getAll', {
        params: {
          status,
        },
      });
      return res;
    } catch (errors) {
      throw new Error(String(errors));
    }
  }
);

export const approvalCustomerOrderAsync = createAsyncThunk(
  'customerOrders/approval',
  async (params: UpdateRequest) => {
    try {
      const res = await axiosClient.put(
        'api/customerOrder/approval',
        {
          status: params.status,
          deliveryStaffId: params.deliveryStaffId,
          approvalStaffId: params.approvalStaffId,
        },
        {
          params: {
            id: params.id,
          },
        }
      );
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const changeDeliveryStaffAsync = createAsyncThunk(
  'customerOrders/changeDeliveryStaff',
  async (params: UpdateRequest) => {
    try {
      const res = await axiosClient.put(
        'api/customerOrder/changeDeliveryStaff',
        {
          deliveryStaffId: params.deliveryStaffId,
        },
        {
          params: {
            id: params.id,
          },
        }
      );
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const deliveredAsync = createAsyncThunk(
  'customerOrders/delivered',
  async (id: number) => {
    try {
      const res = await axiosClient.put(
        'api/customerOrder/delivered',
        {
          status: 3,
        },
        {
          params: {
            id,
          },
        }
      );
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const cancelledAsync = createAsyncThunk(
  'customerOrders/cancelled',
  async (id: number) => {
    try {
      const res = await axiosClient.put(
        'api/customerOrder/cancelled',
        {
          status: 4,
        },
        {
          params: {
            id,
          },
        }
      );
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const getOrderDetailAsync = createAsyncThunk(
  'customerOrders/detail',
  async (id: number) => {
    try {
      const res = await axiosClient.get('api/customerOrderDetail/getById', {
        params: {
          id,
        },
      });
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const getRevenueAsync = createAsyncThunk(
  'revenue/get',
  async ({ startDate, endDate }: CustomTimeType) => {
    try {
      const res = await axiosClient.get('api/revenue/get', {
        params: {
          start: startDate,
          end: endDate,
        },
      });
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);

export const getDeliveryAsync = createAsyncThunk(
  'customerOrders/getDelivery',
  async ({ deliveryStaffId, status }: GetDeliveryRequest) => {
    try {
      const res = await axiosClient.get('api/customerOrder/getDelivery', {
        params: {
          deliveryStaffId,
          status,
        },
      });
      return res;
    } catch (error) {
      throw new Error(String(error));
    }
  }
);
