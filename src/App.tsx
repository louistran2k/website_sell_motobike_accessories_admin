import Loading from './common/components/Loading';
import { Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import {
  adminAppRoutes,
  adminAuthRoutes,
  shipperAppRoutes,
  shipperAuthRoutes,
} from './routes';
import AdminLayout from 'layouts';
import Authentication from 'layouts/AuthenticationLayout';
import ProtectedAdmin from 'routes/ProtectedAdmin';
import ProtectedShipper from 'routes/ProtectedShipper';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/app" />} />
          <Route path="/admin" element={<Outlet />}>
            <Route index element={<Navigate to="app" />} />
            <Route path="auth" element={<Authentication />}>
              {adminAuthRoutes.map(({ path, Component }, index) => (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loading />}>
                      <Component />
                    </Suspense>
                  }
                />
              ))}
            </Route>
            <Route
              path="app"
              element={
                <ProtectedAdmin>
                  <AdminLayout>
                    <Outlet />
                  </AdminLayout>
                </ProtectedAdmin>
              }
            >
              <Route index element={<Navigate to="orders" />} />
              {adminAppRoutes.map(({ path, Component }, index) => (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loading />}>
                      <Component />
                    </Suspense>
                  }
                />
              ))}
            </Route>
          </Route>
          <Route path="/shipper" element={<Outlet />}>
            <Route index element={<Navigate to="app" />} />
            <Route path="auth" element={<Authentication />}>
              {shipperAuthRoutes.map(({ path, Component }, index) => (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loading />}>
                      <Component />
                    </Suspense>
                  }
                />
              ))}
            </Route>
            <Route
              path="app"
              element={
                <ProtectedShipper>
                  <AdminLayout>
                    <Outlet />
                  </AdminLayout>
                </ProtectedShipper>
              }
            >
              <Route index element={<Navigate to="delivery" />} />
              {shipperAppRoutes.map(({ path, Component }, index) => (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loading />}>
                      <Component />
                    </Suspense>
                  }
                />
              ))}
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
