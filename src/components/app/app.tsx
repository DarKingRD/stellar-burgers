import { Routes, Route, useNavigate } from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';
import {
  ConstructorPage,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  Feed,
  NotFound404
} from '@pages';

import { AppHeader, IngredientDetails, OrderInfo, Modal } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { GuestRoute } from '../guest-route/guest-route';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getUser } from '../../services/slices/userSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main>
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route
            path='/login'
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path='/register'
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <GuestRoute>
                <ForgotPassword />
              </GuestRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <GuestRoute>
                <ResetPassword />
              </GuestRoute>
            }
          />
          <Route
            path='/profile/*'
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path='' element={<Profile />} />
                  <Route path='orders' element={<ProfileOrders />} />
                  <Route
                    path='orders/:number'
                    element={
                      <Modal
                        title='Информация о заказе'
                        onClose={() => navigate('/profile/orders')}
                      >
                        <OrderInfo />
                      </Modal>
                    }
                  />
                </Routes>
              </ProtectedRoute>
            }
          />
          <Route path='/feed' element={<Feed />} />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Информация о заказе'
                onClose={() => navigate('/feed')}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate('/')}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
