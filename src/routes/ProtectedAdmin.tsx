import { Navigate } from 'react-router-dom';
import { setStatus } from 'redux/customerOrder/slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { adminAccessTokenSelector } from 'redux/user/selectors';
import { CustomerOrderStatus } from 'types/customerOrder.type';

type Props = {
  children: JSX.Element;
};

const ProtectedAdmin = ({ children }: Props) => {
  const accessToken = useAppSelector(adminAccessTokenSelector);
  if (!accessToken) {
    return <Navigate to="/admin/auth/login" />;
  }
  return children;
};

export default ProtectedAdmin;
