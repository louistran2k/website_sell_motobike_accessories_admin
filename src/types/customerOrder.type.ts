import { Customer } from './customer.type';
import { Product } from './product.type';
import { Staff } from './staff.type';

export interface CustomerOrderState {
  list: CustomerOrderDto[];
  staffs: Staff[];
  status: CustomerOrderStatus;
  isShowDetail: boolean;
  customerOrder: CustomerOrderDto;
}

export interface CustomerOrder {
  id: number;
  createAt: Date;
  status: CustomerOrderStatus;
  deliveryAddress: string;
  deliveryDate: Date;
  receiverFullName: string;
  receiverPhoneNumber: string;
  receiverEmail: string;
  totalPrice: number;
  approvalStaffId: string;
  deliveryStaffId: string;
  approvalStaffName: string;
  deliveryStaffName: string;
  citizenIdentification: string;
}

export interface CustomerOrderDto {
  id: number;
  createAt: Date;
  status: CustomerOrderStatus;
  deliveryAddress: string;
  deliveryDate: Date;
  receiverFullName: string;
  receiverPhoneNumber: string;
  receiverEmail: string;
  totalPrice: number;
  approvalStaffId: string;
  deliveryStaffId: string;
  approvalStaffName: string;
  deliveryStaffName: string;
  citizenIdentification: string;
  customerOrderDetails: CustomerOrderDetailDto[];
  customer: Customer | null;
}

export interface CustomerOrderDetail {
  productId: string;
  customerOrderId: number;
  orderQuantity: number;
  totalPrice: number;
  customerComment?: string;
  customerMark?: number;
  returnCardId?: string;
  returnQuantity?: number;
}

export interface CustomerOrderDetailDto {
  productId: string;
  customerOrderId: number;
  orderQuantity: number;
  totalPrice: number;
  customerComment?: string;
  customerMark?: number;
  returnCardId?: string;
  returnQuantity?: number;
  product: Product;
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
