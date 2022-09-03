import {
  Dialog,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { getDetail } from 'redux/customerOrder/selectors';
import { convertCurrency } from 'redux/customerOrder/slice';
import { useAppSelector } from 'redux/hooks';
import { CustomerOrderStatus } from 'types/customerOrder.type';
import { useStyles } from '../style';

type Props = {
  openViewDetail: boolean;
  handleClose: () => void;
};

const OrderDetail = ({ openViewDetail, handleClose }: Props) => {
  const classes = useStyles();
  const orderDetail = useAppSelector(getDetail);

  const total = orderDetail.customerOrderDetails.reduce(
    (prev, cur) => prev + cur.totalPrice,
    0
  );

  return (
    <Dialog
      open={openViewDetail}
      onClose={handleClose}
      className={classes.detail}
    >
      <IconButton
        onClick={handleClose}
        className={classes.btnClose}
        style={{ position: 'absolute' }}
      >
        <HighlightOffIcon />
      </IconButton>
      <Typography variant="h4">Chi tiết đơn hàng</Typography>
      <Typography>{`Mã đơn đặt: ${orderDetail.id}`}</Typography>
      <Typography>{`Trạng thái đơn hàng: ${
        CustomerOrderStatus[orderDetail.status]
      }`}</Typography>
      {orderDetail.approvalStaffId && (
        <Typography>{`Nhân viên duyệt: ${orderDetail.approvalStaffName}`}</Typography>
      )}
      {orderDetail.deliveryStaffId && (
        <Typography>{`Nhân viên giao: ${orderDetail.deliveryStaffName}`}</Typography>
      )}
      <Grid container className={classes.customer}>
        <Grid item xs={6}>
          {orderDetail.customer && (
            <>
              <Typography>{`Tên khách hàng: ${orderDetail.customer.firstName} ${orderDetail.customer.lastName}`}</Typography>
              {orderDetail.customer.phoneNumber && (
                <Typography>{`Số điện thoại: ${orderDetail.customer.phoneNumber}`}</Typography>
              )}
            </>
          )}

          <Typography>{`Ngày đặt: ${format(
            new Date(orderDetail.createAt),
            'dd-MM-yyyy'
          )}`}</Typography>
          <Typography>{`Ngày giao: ${format(
            new Date(orderDetail.deliveryDate),
            'dd-MM-yyyy'
          )}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          {orderDetail.receiverFullName && (
            <Typography>{`Người nhận: ${orderDetail.receiverFullName}`}</Typography>
          )}
          {orderDetail.receiverPhoneNumber && (
            <Typography>{`Số điện thoại: ${orderDetail.receiverPhoneNumber}`}</Typography>
          )}
          {orderDetail.receiverEmail && (
            <Typography>{`Email: ${orderDetail.receiverEmail}`}</Typography>
          )}
          {orderDetail.deliveryAddress && (
            <Typography>{`Địa chỉ: ${orderDetail.deliveryAddress}`}</Typography>
          )}
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ textAlign: 'left' }}>Tên sản phẩm</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Số lượng</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Đơn giá</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Trị giá</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderDetail.customerOrderDetails.length > 0 &&
            orderDetail.customerOrderDetails.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body1">{item.product.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ textAlign: 'center' }}>
                    {item.orderQuantity}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ textAlign: 'right' }}>
                    {convertCurrency(item.totalPrice / item.orderQuantity)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" style={{ textAlign: 'right' }}>
                    {convertCurrency(item.totalPrice)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell>Thành tiền</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>{convertCurrency(total)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Dialog>
  );
};

export default OrderDetail;
