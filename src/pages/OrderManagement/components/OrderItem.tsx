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
import { format } from 'date-fns';
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
  const staffs = useAppSelector(getStaffs);
  const status = useAppSelector(getStatus);
  const user = useAppSelector(getAdmin);

  const [staff, setStaff] = useState(
    item.deliveryStaffId ? item.deliveryStaffId : ''
  );

  const handleChange = (event: SelectChangeEvent) => {
    setStaff(event.target.value as string);
  };
  const handleViewOrderDetail = () => {
    dispatch(setIsShowDetail());
    dispatch(getOrderDetailAsync(item.customerOrderId));
  };
  const handleUpdate = async () => {
    switch (status) {
      case CustomerOrderStatus.WAIT_CONFIRM: {
        const params: UpdateRequest = {
          id: item.customerOrderId,
          status,
          approvalStaffId: user.id,
          deliveryStaffId: staff,
        };
        const confirm = await Swal.fire({
          title: 'Xác nhận đơn hàng',
          text: `Đơn hàng ${item.customerOrderId}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: confirmButtonColor,
          cancelButtonColor: cancelButtonColor,
          confirmButtonText: 'Yes',
          reverseButtons: true,
        });
        if (confirm.isConfirmed) {
          dispatch(approvalCustomerOrderAsync(params));
        }
        break;
      }
      case CustomerOrderStatus.DELIVERING: {
        const confirm = await Swal.fire({
          title: 'Xác nhận giao thành công',
          text: `Đơn hàng ${item.customerOrderId}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: confirmButtonColor,
          cancelButtonColor: cancelButtonColor,
          confirmButtonText: 'Yes',
          reverseButtons: true,
        });
        if (confirm.isConfirmed) {
          dispatch(deliveredAsync(item.customerOrderId));
        }
        break;
      }
    }
  };
  const handleCancel = async () => {
    const confirm = await Swal.fire({
      title: 'Hủy đơn hàng',
      text: `Đơn hàng ${item.customerOrderId}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: cancelButtonColor,
      confirmButtonText: 'Yes',
      reverseButtons: true,
    });
    if (confirm.isConfirmed) {
      dispatch(cancelledAsync(item.customerOrderId));
    }
  };
  const handleChangeDeliveryStaff = async () => {
    const params: UpdateRequest = {
      id: item.customerOrderId,
      status,
      deliveryStaffId: staff,
    };
    const confirm = await Swal.fire({
      title: 'Đổi nhân viên giao hàng',
      text: ``,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: cancelButtonColor,
      confirmButtonText: 'Yes',
      reverseButtons: true,
    });
    if (confirm.isConfirmed) {
      dispatch(changeDeliveryStaffAsync(params));
    }
  };
  return (
    <TableRow key={item.customerOrderId}>
      <TableCell size="small">
        <Typography variant="body1">{item.customerOrderId}</Typography>
      </TableCell>
      <TableCell size="small">
        <Typography variant="body1">{item.ordererName}</Typography>
      </TableCell>
      {(status === CustomerOrderStatus.WAIT_CONFIRM ||
        status === CustomerOrderStatus.COMPLETED) && (
        <TableCell>
          <Typography variant="body1">
            {format(new Date(item.createAt), 'dd/MM/yyyy')}
          </Typography>
        </TableCell>
      )}
      {(status === CustomerOrderStatus.WAIT_CONFIRM ||
        status === CustomerOrderStatus.DELIVERING ||
        status === CustomerOrderStatus.COMPLETED) && (
        <TableCell>
          <Typography variant="body1">
            {format(new Date(item.deliveryDate), 'dd/MM/yyyy')}
          </Typography>
        </TableCell>
      )}
      <TableCell size="small">
        <Typography variant="body1">{convertCurrency(item.total)}</Typography>
      </TableCell>
      {(status === CustomerOrderStatus.DELIVERING ||
        status === CustomerOrderStatus.COMPLETED) && (
        <TableCell>
          <Typography variant="body1">{item.approvalStaffName}</Typography>
        </TableCell>
      )}
      {status === CustomerOrderStatus.COMPLETED && (
        <TableCell>
          <Typography variant="body1">{item.deliveryStaffName}</Typography>
        </TableCell>
      )}
      {(status === CustomerOrderStatus.WAIT_CONFIRM ||
        status === CustomerOrderStatus.DELIVERING) && (
        <TableCell>
          <Select value={staff} onChange={handleChange}>
            {staffs.map((item) => (
              <MenuItem
                key={item.id}
                value={item.id}
              >{`${item.firstName} ${item.lastName}`}</MenuItem>
            ))}
          </Select>
          {status === CustomerOrderStatus.DELIVERING && (
            <IconButton
              onClick={handleChangeDeliveryStaff}
              disabled={staff === item.deliveryStaffId}
            >
              <Tooltip title="Đổi người giao hàng">
                <CheckCircle style={{ color: theme.palette.success.main }} />
              </Tooltip>
            </IconButton>
          )}
        </TableCell>
      )}
      <TableCell size="small">
        <IconButton onClick={handleViewOrderDetail}>
          <Tooltip title="Xem chi tiết đơn hàng">
            <Visibility style={{ color: 'var(--primary-color)' }} />
          </Tooltip>
        </IconButton>
        {(status === CustomerOrderStatus.WAIT_CONFIRM ||
          status === CustomerOrderStatus.DELIVERING) && (
          <IconButton onClick={handleUpdate} disabled={staff === ''}>
            <Tooltip
              title={`${
                status === CustomerOrderStatus.WAIT_CONFIRM
                  ? 'Xác nhận đơn hàng'
                  : 'Giao thành công'
              }`}
            >
              <CheckCircle style={{ color: theme.palette.success.main }} />
            </Tooltip>
          </IconButton>
        )}
        {(status === CustomerOrderStatus.WAIT_CONFIRM ||
          status === CustomerOrderStatus.DELIVERING) && (
          <IconButton onClick={handleCancel}>
            <Tooltip
              title={`${
                status === CustomerOrderStatus.WAIT_CONFIRM
                  ? 'Hủy đơn hàng'
                  : 'Giao không thành công'
              }`}
            >
              <Delete style={{ color: theme.palette.error.main }} />
            </Tooltip>
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default OrderItem;
