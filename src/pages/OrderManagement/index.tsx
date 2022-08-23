import {
  AppBar,
  Container,
  Dialog,
  DialogTitle,
  Tab,
  Tabs,
} from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { setIsShowDetail, setStatus } from 'redux/customerOrder/slice';
import { getCustomerOrdersAsync } from 'redux/customerOrder/thunkActions';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getCustomerOrders, getIsShowDetail, getStatus } from 'redux/customerOrder/selectors';
import { getStaffsAsync } from 'redux/staff/thunkActions';
import { CustomerOrderStatus } from 'types/customerOrder.type';
import TableOrder from './components/TableOrder';
import { useStyles } from './style';
import OrderDetail from './components/OrderDetail';

const OrderManagement = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const status = useAppSelector(getStatus);
  const isShowDetail = useAppSelector(getIsShowDetail);

  const handleChange = (
    event: SyntheticEvent,
    newValue: CustomerOrderStatus
  ) => {
    dispatch(setStatus(newValue));
  };

  useEffect(() => {
    (async () => {
      await dispatch(getStaffsAsync());
      dispatch(getCustomerOrdersAsync(status));
    })()
  }, [status]);

  return (
    <>
      <Container disableGutters>
        <AppBar position="static">
          <Tabs
            value={status}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab
              label="Chờ xác nhận"
              value={CustomerOrderStatus.WAIT_CONFIRM}
            />
            <Tab label="Đang giao" value={CustomerOrderStatus.DELIVERING} />
            <Tab label="Đã hoàn tất" value={CustomerOrderStatus.COMPLETED} />
            <Tab label="Đã hủy" value={CustomerOrderStatus.CANCELLED} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={status - 1}
          value={status}
          className={classes.container}
        >
          <div>
            {status === CustomerOrderStatus.WAIT_CONFIRM && <TableOrder />}
          </div>
          <div>
            {status === CustomerOrderStatus.DELIVERING && <TableOrder />}
          </div>
          <div>
            {status === CustomerOrderStatus.COMPLETED && <TableOrder />}
          </div>
          <div>
            {status === CustomerOrderStatus.CANCELLED && <TableOrder />}
          </div>
        </SwipeableViews>
      </Container>
      <OrderDetail openViewDetail={isShowDetail} handleClose={() => dispatch(setIsShowDetail())} />
    </>
  );
};

export default OrderManagement;
