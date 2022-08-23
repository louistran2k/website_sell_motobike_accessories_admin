import { Staff } from './staff.type';

export interface CustomerOrderState {
  list: CustomerOrder[];
  staffs: Staff[];
  status: CustomerOrderStatus;
  isShowDetail: boolean;
  customerOrder: CustomerOrder;
  deliveryStatus: CustomerOrderStatus;
  shipperList: CustomerOrder[];
}

export interface CustomerOrder {
  customerOrderId: number;
  createAt: Date;
  status: CustomerOrderStatus;
  deliveryAddress: string;
  deliveryDate: Date;
  receiverName: string;
  receiverPhoneNumber: string;
  receiverEmail: string;
  total: number;
  approvalStaffId: string;
  deliveryStaffId: string;
  approvalStaffName: string;
  deliveryStaffName: string;
  citizenIdentification: string;
  ordererName: string;
  ordererPhoneNumber: string;
  details: CustomerOrderDetail[];
}

export interface CustomerOrderDetail {
  productId: string;
  productName: string;
  customerOrderId: number;
  orderQuantity: number;
  totalPrice: number;
  customerComment?: string;
  customerMark?: number;
  returnCardId?: string;
  returnQuantity?: number;
}

export enum CustomerOrderStatus {
  IN_CART,
  WAIT_CONFIRM,
  DELIVERING,
  COMPLETED,
  CANCELLED,
}

export enum DeliveryStatus {
  ASSIGNED,
  COMPLETED,
}

export interface UpdateRequest {
  id?: number;
  approvalStaffId?: string;
  deliveryStaffId?: string;
  status?: CustomerOrderStatus;
}

export interface Revenue {
  month: number;
  year: number;
  revenue: number;
}

export interface GetDeliveryRequest {
  deliveryStaffId: string;
  status: CustomerOrderStatus;
}
