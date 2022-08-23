import {
  Home,
  ImportContacts,
  InsertChart,
  LocalShipping,
} from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useStyles } from './style';

const adminDashboard = [
  {
    to: '/admin/app/home',
    icon: Home,
    title: 'Trang chủ',
  },
  {
    to: '/admin/app/orders',
    icon: ImportContacts,
    title: 'Quản lý đơn hàng',
  },
  // {
  //   to: '/admin/app/products',
  //   icon: InsertChart,
  //   title: 'Quản lý sản phẩm',
  // },
  {
    to: '/admin/app/statistical',
    icon: InsertChart,
    title: 'Thống kê doanh thu',
  },
];

const shipperDashboard = [
  {
    to: '/shipper/app/delivery',
    icon: LocalShipping,
    title: 'Quản lý giao hàng',
  },
];

const Sidebar = () => {
  const classes = useStyles();
  const location = useLocation();
  const [dashboard, setDashboard] = useState([
    {
      to: '',
      icon: Home,
      title: '',
    },
  ]);

  useEffect(() => {
    if (location.pathname.includes('shipper')) {
      setDashboard(shipperDashboard);
    } else {
      setDashboard(adminDashboard);
    }
  }, [location.pathname]);

  return (
    <Drawer
      className={classes['left-sidebar']}
      PaperProps={{
        elevation: 7,
      }}
      open={true}
      variant="persistent"
    >
      <List component="nav" disablePadding>
        {dashboard.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.to}
              className={({ isActive }) =>
                isActive ? classes.active : 'inactive'
              }
            >
              <ListItem button>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
