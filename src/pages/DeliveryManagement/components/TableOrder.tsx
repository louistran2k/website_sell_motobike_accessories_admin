import {
  Dialog,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { getCustomerOrders, getStatus } from 'redux/customerOrder/selectors';
import OrderItem from './OrderItem';

const TableOrder = () => {
  const list = useAppSelector(getCustomerOrders);
  const status = useAppSelector(getStatus);

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h3">Mã đơn đặt</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h3">Người nhận</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h3">Số ĐT NN</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h3">Ngày giao</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h3">Địa chỉ</Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableOrder;
