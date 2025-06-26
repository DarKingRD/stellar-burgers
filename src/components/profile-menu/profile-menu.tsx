import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutApi } from '@api';
import { deleteCookie } from '../../utils/cookie';
import { setUser, setAuthenticated } from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logoutApi()
      .then(() => {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        dispatch(setUser(null));
        dispatch(setAuthenticated(false));
        navigate('/login', { replace: true });
      })
      .catch((err) => {
        console.error('Logout failed:', err);
        alert('Ошибка: ' + err);
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
