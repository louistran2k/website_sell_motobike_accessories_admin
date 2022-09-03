import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { format, startOfMonth } from 'date-fns';
import {
  Dialog,
  Typography,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  TextFieldProps,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Grid,
  Link,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAppSelector } from 'redux/hooks';
import axiosClient from 'api/axiosClient';
import { convertCurrency } from 'redux/customerOrder/slice';
import { Revenue } from 'types/customerOrder.type';
import { getAdmin } from 'redux/user/selectors';
import { useStyles } from './style';

export interface CustomTimeType {
  startDate: Date | null;
  endDate: Date | null;
}

const schema = yup.object().shape({
  startDate: yup.date().required().label('Start date'),
  endDate: yup
    .date()
    .required()
    .label('End date')
    .min(yup.ref('startDate'), "End date can't be before start date"),
});

const RevenueStatistics = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [revenue, setRevenue] = useState<Revenue[]>([]);
  const [link, setLink] = useState('#');
  const user = useAppSelector(getAdmin);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const {
    control,
    formState: { isValid, errors },
    handleSubmit,
    getValues,
  } = useForm<CustomTimeType>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      startDate: startOfMonth(new Date()),
      endDate: new Date(),
    },
  });

  const onSubmit = async (data: CustomTimeType) => {
    try {
      const res = await axiosClient.get('api/revenue/export', {
        params: {
          start: format(data.startDate as Date, 'yyyy-MM-dd'),
          end: format(data.endDate as Date, 'yyyy-MM-dd'),
          fullName: `${user.firstName} ${user.lastName}`,
        },
      });
      setRevenue(res.data.list);
      setLink(res.data.filename);
    } catch (error) {
      throw new Error(String(error));
    }
    handleClose();
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosClient.get('api/revenue/export', {
          params: {
            start: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
            end: format(new Date(), 'yyyy-MM-dd'),
            fullName: `${user.firstName} ${user.lastName}`,
          },
        });
        setRevenue(res.data.list);
        setLink(res.data.filename);
      } catch (error) {
        throw new Error(String(error));
      }
    })();
  }, []);

  const calcTotal = () =>
    revenue.reduce((prev, current) => prev + current.revenue, 0);

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="startDate"
                control={control}
                defaultValue={null}
                render={({ field }) => {
                  return (
                    <DatePicker
                      label="Start date"
                      inputFormat="dd/MM/yyyy"
                      maxDate={startOfMonth(new Date())}
                      {...field}
                      renderInput={(
                        params: JSX.IntrinsicAttributes & TextFieldProps
                      ) => (
                        <TextField
                          InputLabelProps={{
                            style: { color: 'var(--secondary-color)' },
                          }}
                          color="secondary"
                          required
                          fullWidth
                          style={{
                            marginBottom: 30,
                          }}
                          {...params}
                          error={!!errors.startDate}
                          helperText={errors.startDate?.message ?? ''}
                        />
                      )}
                    />
                  );
                }}
              />
              <Controller
                name="endDate"
                control={control}
                defaultValue={null}
                render={({ field }) => {
                  return (
                    <DatePicker
                      label="End date"
                      inputFormat="dd/MM/yyyy"
                      maxDate={new Date()}
                      {...field}
                      renderInput={(
                        params: JSX.IntrinsicAttributes & TextFieldProps
                      ) => (
                        <TextField
                          InputLabelProps={{
                            style: { color: 'var(--secondary-color)' },
                          }}
                          color="secondary"
                          required
                          fullWidth
                          {...params}
                          error={!!errors.endDate}
                          helperText={errors.endDate?.message ?? ''}
                        />
                      )}
                    />
                  );
                }}
              />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Hủy
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid}
            >
              OK
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        style={{ marginRight: 20 }}
      >
        Chọn thời gian
      </Button>
      <Link href={link} download target="_blank" underline="none">
        <Button variant="contained" color="primary" disabled={link === '#'}>
          Export file
        </Button>
      </Link>
      {revenue.length > 0 && (
        <div className={classes.container}>
          <Typography variant="h2">DOANH THU THEO THÁNG</Typography>
          {getValues('startDate') && getValues('endDate') && (
            <Typography>
              {`(Từ ngày ${format(
                new Date(getValues('startDate') as Date),
                'dd/MM/yyyy'
              )} đến ngày ${format(
                new Date(getValues('endDate') as Date),
                'dd/MM/yyyy'
              )})`}
            </Typography>
          )}
          <Grid container justifyContent="center" style={{ marginTop: 15 }}>
            <Grid item xs={8}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tháng</TableCell>
                    <TableCell>Doanh thu</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {revenue.length > 0 &&
                    revenue.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body1">{`${item.month}/${item.year}`}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body1"
                            style={{ textAlign: 'right' }}
                          >
                            {convertCurrency(item.revenue)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow>
                    <TableCell>Tổng doanh thu</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>
                      {convertCurrency(calcTotal())}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
          <div className={classes.sign}>
            <Typography>{`TP.HCM, ngày ${new Date().getDate()} tháng ${
              new Date().getMonth() + 1
            } năm ${new Date().getFullYear()}`}</Typography>
            <Typography>Người lập</Typography>
            <br />
            <br />
            <br />
            <Typography>{`${user.firstName} ${user.lastName}`}</Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default RevenueStatistics;
