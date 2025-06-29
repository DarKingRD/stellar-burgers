import userReducer, {
  initialState,
  getUser,
  setAuthChecked,
  clearUserErrors,
  setUser,
  setAuthenticated
} from './userSlice';
import { TUser } from '@utils-types';

describe('Тесты для userSlice', () => {
  const mockUser: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  describe('Асинхронное действие getUser', () => {
    it('должен сохранять данные пользователя и статусы аутентификации при успешном выполнении', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: mockUser
      };
      const state = userReducer(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('должен устанавливать authChecked в true при ошибке', () => {
      const action = { type: getUser.rejected.type };
      const state = userReducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('Синхронные действия', () => {
    it('должен изменять статус authChecked при вызове setAuthChecked', () => {
      const action = setAuthChecked(true);
      const state = userReducer(initialState, action);

      expect(state.isAuthChecked).toBe(true);
    });

    it('должен очищать ошибки пользователя при вызове clearUserErrors', () => {
      const stateWithErrors = {
        ...initialState,
        loginUserError: 'Ошибка входа',
        registerUserError: 'Ошибка регистрации'
      };

      const action = clearUserErrors();
      const state = userReducer(stateWithErrors, action);

      expect(state.loginUserError).toBeNull();
      expect(state.registerUserError).toBeNull();
    });

    it('должен сохранять данные пользователя при вызове setUser', () => {
      const action = setUser(mockUser);
      const state = userReducer(initialState, action);

      expect(state.user).toEqual(mockUser);
    });

    it('должен очищать данные пользователя при вызове setUser(null)', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser
      };

      const action = setUser(null);
      const state = userReducer(stateWithUser, action);

      expect(state.user).toBeNull();
    });

    it('должен изменять статус аутентификации при вызове setAuthenticated', () => {
      const action = setAuthenticated(true);
      const state = userReducer(initialState, action);

      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('Изменения состояния', () => {
    it('должен сохранять другие свойства состояния при обновлении пользователя', () => {
      const stateWithData = {
        ...initialState,
        loginUserError: 'Ошибка',
        registerUserRequest: true
      };

      const action = setUser(mockUser);
      const state = userReducer(stateWithData, action);

      expect(state.user).toEqual(mockUser);
      expect(state.loginUserError).toBe('Ошибка');
      expect(state.registerUserRequest).toBe(true);
    });

    it('должен корректно обрабатывать процесс аутентификации', () => {
      let state = userReducer(initialState, setAuthChecked(false));
      expect(state.isAuthChecked).toBe(false);

      state = userReducer(state, {
        type: getUser.fulfilled.type,
        payload: mockUser
      });
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });
  });
});
