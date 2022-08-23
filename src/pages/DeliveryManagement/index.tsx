import { AppBar, Container, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { setIsShowDetail, setDeliveryStatus } from 'redux/customerOrder/slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  getIsShowDetail,
  getDeliveryStatus,
} from 'redux/customerOrder/selectors';
import {
  CustomerOrderStatus,
  GetDeliveryRequest,
} from 'types/customerOrder.type';
import { useStyles } from '../OrderManagement/style';
import OrderDetail from 'pages/OrderManagement/components/OrderDetail';
import TableOrder from './components/TableOrder';
import { getDeliveryAsync } from 'redux/customerOrder/thunkActions';
import { getShipper } from 'redux/user/selectors';

const DeliveryManagement = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const status = useAppSelector(getDeliveryStatus);
  const shipper = useAppSelector(getShipper);
  const isShowDetail = useAppSelector(getIsShowDetail);

  const handleChange = (
    event: SyntheticEvent,
    newValue: CustomerOrderStatus
  ) => {
    dispatch(setDeliveryStatus(newValue));
  };

  useEffect(() => {
    const req: GetDeliveryRequest = {
      deliveryStaffId: shipper.id.trim(),
      status,
    };
    (async () => {
      dispatch(getDeliveryAsync(req));
    })();
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
              label="Được phần công"
              value={CustomerOrderStatus.DELIVERING}
            />
            <Tab label="Đã hoàn tất" value={CustomerOrderStatus.COMPLETED} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={status - 2}
          value={status}
          className={classes.container}
        >
          <div>
            {status === CustomerOrderStatus.DELIVERING && <TableOrder />}
          </div>
          <div>
            {status === CustomerOrderStatus.COMPLETED && <TableOrder />}
          </div>
        </SwipeableViews>
      </Container>
      <OrderDetail
        openViewDetail={isShowDetail}
        handleClose={() => dispatch(setIsShowDetail())}
      />
    </>
  );
};

export default DeliveryManagement;
