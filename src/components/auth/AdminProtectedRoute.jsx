import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo && userInfo.type === 'ADMIN') {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AdminProtectedRoute;
