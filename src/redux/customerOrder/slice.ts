import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getStaffsAsync } from 'redux/staff/thunkActions';
import {
  CustomerOrder,
  CustomerOrderDto,
  CustomerOrderState,
  CustomerOrderStatus,
  DeliveryStatus,
} from 'types/customerOrder.type';
import { Staff } from 'types/staff.type';
import {
  approvalCustomerOrderAsync,
  cancelledAsync,
  changeDeliveryStaffAsync,
  deliveredAsync,
  getCustomerOrdersAsync,
  getDeliveryAsync,
  getOrderDetailAsync,
} from './thunkActions';

export const convertCurrency = (price: number) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);

export const customerOrderInit: CustomerOrderDto = {
  id: -1,
  createAt: new Date(),
  status: -1,
  deliveryAddress: '',
  deliveryDate: new Date(),
  receiverFullName: '',
  receiverPhoneNumber: '',
  receiverEmail: '',
  totalPrice: 0,
  approvalStaffId: '',
  deliveryStaffId: '',
  approvalStaffName: '',
  deliveryStaffName: '',
  citizenIdentification: '',
  customerOrderDetails: [],
  customer: null,
};

export const initialState: CustomerOrderState = {
  list: [],
  staffs: [],
  status: CustomerOrderStatus.WAIT_CONFIRM,
  isShowDetail: false,
  customerOrder: customerOrderInit,
};

const customerOrderSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    setIsShowDetail: (state) => {
      state.isShowDetail = !state.isShowDetail;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCustomerOrdersAsync.fulfilled, (state, { payload }) => {
      state.list = payload.data;
      state.list.forEach((item) => {
        const tmp: Staff | undefined = state.staffs.find(
          (staff) => staff.id === item.approvalStaffId
        );
        if (tmp) {
          item.approvalStaffName = `${tmp.firstName} ${tmp.lastName}`;
        }
        const tmp1: Staff | undefined = state.staffs.find(
          (staff) => staff.id === item.deliveryStaffId
        );
        if (tmp1) {
          item.deliveryStaffName = `${tmp1.firstName} ${tmp1.lastName}`;
        }
      });
    });
    builder.addCase(getStaffsAsync.fulfilled, (state, { payload }) => {
      state.staffs = payload.data.map((item: any) => ({
        ...item,
        roleId: item.account.roleId.trim(),
      }));
    });
    builder.addCase(
      approvalCustomerOrderAsync.fulfilled,
      (state, { payload }) => {
        if (payload.data === 1) {
          state.list = state.list.filter(
            (item) => item.id !== payload.config.params.id
          );
          toast.success(`Đã xác nhận đơn hàng ${payload.config.params.id}`);
        }
      }
    );
    builder.addCase(
      changeDeliveryStaffAsync.fulfilled,
      (state, { payload }) => {
        if (payload.data === 1) {
          const deliveryStaffId = JSON.parse(
            payload.config.data
          ).deliveryStaffId;
          state.list.forEach((item) => {
            if (item.id === payload.config.params.id) {
              item.deliveryStaffId = deliveryStaffId;
            }
          });
          toast.success(
            `Đơn hàng ${payload.config.params.id}: Đổi nhân viên giao hàng ${deliveryStaffId}`
          );
        }
      }
    );
    builder.addCase(deliveredAsync.fulfilled, (state, { payload }) => {
      if (payload.data === 1) {
        state.list = state.list.filter(
          (item) => item.id !== payload.config.params.id
        );
        toast.success(`Đơn hàng ${payload.config.params.id}: Giao thành công`);
      }
    });
    builder.addCase(cancelledAsync.fulfilled, (state, { payload }) => {
      if (payload.data === 1) {
        state.list = state.list.filter(
          (item) => item.id !== payload.config.params.id
        );
        toast.success(`Đã hủy đơn hàng ${payload.config.params.id}`);
      }
    });
    builder.addCase(getOrderDetailAsync.fulfilled, (state, { payload }) => {
      let approvalStaffName = '';
      let deliveryStaffName = '';
      const tmp: Staff | undefined = state.staffs.find(
        (staff) => staff.id.trim() === payload.data.approvalStaffId.trim()
      );
      if (tmp) {
        approvalStaffName = `${tmp.firstName} ${tmp.lastName}`;
      }
      const tmp1: Staff | undefined = state.staffs.find(
        (staff) => staff.id.trim() === payload.data.deliveryStaffId.trim()
      );
      if (tmp1) {
        deliveryStaffName = `${tmp1.firstName} ${tmp1.lastName}`;
      }
      state.customerOrder = {
        ...payload.data,
        approvalStaffName,
        deliveryStaffName,
      };
    });
    builder.addCase(getDeliveryAsync.fulfilled, (state, { payload }) => {
      state.list = payload.data;
      state.list.forEach((item) => {
        const tmp: Staff | undefined = state.staffs.find(
          (staff) => staff.id === item.approvalStaffId
        );
        if (tmp) {
          item.approvalStaffName = `${tmp.firstName} ${tmp.lastName}`;
        }
        const tmp1: Staff | undefined = state.staffs.find(
          (staff) => staff.id === item.deliveryStaffId
        );
        if (tmp1) {
          item.deliveryStaffName = `${tmp1.firstName} ${tmp1.lastName}`;
        }
      });
    });
  },
});

const { reducer: customerOrderReducer } = customerOrderSlice;

export const { setStatus, setIsShowDetail } = customerOrderSlice.actions;

export default customerOrderReducer;
