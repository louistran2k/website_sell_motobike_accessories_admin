import { RootState } from '../store';

export const getCustomerOrders = (state: RootState) =>
  state.customerOrderReducer.list;

export const getStaffs = (state: RootState) =>
  state.customerOrderReducer.staffs;

export const getStatus = (state: RootState) =>
  state.customerOrderReducer.status;

export const getIsShowDetail = (state: RootState) =>
  state.customerOrderReducer.isShowDetail;

export const getDetail = (state: RootState) =>
  state.customerOrderReducer.customerOrder;
