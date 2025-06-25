import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { loginUserApi } from '@api';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginUserRequest } = useSelector((state) => state.user);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');

    loginUserApi({ email, password })
      .then((data) => {
        localStorage.setItem('refreshToken', data.refreshToken);
        setCookie('accessToken', data.accessToken);
        dispatch({ type: 'user/setUser', payload: data.user });
        dispatch({ type: 'user/setAuthenticated', payload: true });
        navigate('/');
      })
      .catch((err) => {
        setError(err.message || 'Login error');
      });
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
