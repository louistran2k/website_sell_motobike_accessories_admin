import { Visibility, CheckCircle, Delete } from '@mui/icons-material';
import {
  TableRow,
  TableCell,
  Typography,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent,
  useTheme,
  Tooltip,
} from '@mui/material';
import { format, formatDistance } from 'date-fns';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { convertCurrency, setIsShowDetail } from 'redux/customerOrder/slice';
import {
  approvalCustomerOrderAsync,
  cancelledAsync,
  changeDeliveryStaffAsync,
  deliveredAsync,
  getOrderDetailAsync,
} from 'redux/customerOrder/thunkActions';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getStaffs, getStatus } from 'redux/customerOrder/selectors';
import {
  UpdateRequest,
  CustomerOrder,
  CustomerOrderStatus,
} from 'types/customerOrder.type';
import { getAdmin } from 'redux/user/selectors';
import Swal from 'sweetalert2';
import { confirmButtonColor, cancelButtonColor } from 'themes/HomeTheme';

type Props = {
  item: CustomerOrder;
};

const OrderItem = ({ item }: Props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const status = useAppSelector(getStatus);

  const handleViewOrderDetail = () => {
    dispatch(setIsShowDetail());
    dispatch(getOrderDetailAsync(item.id));
  };
  const handleUpdate = async () => {
    const confirm = await Swal.fire({
      title: 'Xác nhận giao thành công',
      text: `Đơn hàng ${item.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: cancelButtonColor,
      confirmButtonText: 'Yes',
      reverseButtons: true,
    });
    if (confirm.isConfirmed) {
      dispatch(deliveredAsync(item.id));
    }
  };
  return (
    <TableRow key={item.id}>
      <TableCell size="small">
        <Typography variant="body1">{item.id}</Typography>
      </TableCell>
      <TableCell size="small">
        <Typography variant="body1">{item.receiverFullName}</Typography>
      </TableCell>
      <TableCell size="small">
        <Typography variant="body1">{item.receiverPhoneNumber}</Typography>
      </TableCell>
      <TableCell size="small">
        <Typography variant="body1">
          {format(new Date(item.deliveryDate), 'dd/MM/yyyy')}
        </Typography>
      </TableCell>
      <TableCell size="small">
        <Typography variant="body1">{item.deliveryAddress}</Typography>
      </TableCell>
      <TableCell size="small">
        <IconButton onClick={handleViewOrderDetail}>
          <Tooltip title="Xem chi tiết đơn hàng">
            <Visibility style={{ color: 'var(--primary-color)' }} />
          </Tooltip>
        </IconButton>
        {status === CustomerOrderStatus.DELIVERING && (
          <IconButton onClick={handleUpdate}>
            <Tooltip title="Giao thành công">
              <CheckCircle style={{ color: theme.palette.success.main }} />
            </Tooltip>
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default OrderItem;
