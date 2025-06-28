import feedReducer, {
  initialState,
  fetchFeeds,
  fetchUserOrders
} from './feedSlice';
import { TOrder } from '@utils-types';

describe('Тесты для feedSlice', () => {
  const mockOrder: TOrder = {
    _id: '643d69a5c3f7b9001cfa093c',
    status: 'done',
    name: 'Тестовый бургер',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 12345,
    ingredients: ['643d69a5c3f7b9001cfa093c']
  };

  const mockFeedsResponse = {
    orders: [mockOrder],
    total: 1000,
    totalToday: 50
  };

  describe('Асинхронное действие fetchFeeds', () => {
    it('должен устанавливать loading в true при pending', () => {
      const action = { type: fetchFeeds.pending.type };
      const state = feedReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сохранять данные и устанавливать loading в false при fulfilled', () => {
      const action = {
        type: fetchFeeds.fulfilled.type,
        payload: mockFeedsResponse
      };
      const state = feedReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockFeedsResponse.orders);
      expect(state.total).toBe(mockFeedsResponse.total);
      expect(state.totalToday).toBe(mockFeedsResponse.totalToday);
      expect(state.error).toBeNull();
    });

    it('должен сохранять ошибку и устанавливать loading в false при rejected', () => {
      const errorMessage = 'Ошибка загрузки данных';
      const action = {
        type: fetchFeeds.rejected.type,
        error: { message: errorMessage }
      };
      const state = feedReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    it('должен использовать стандартное сообщение об ошибке, если оно не предоставлено', () => {
      const action = {
        type: fetchFeeds.rejected.type,
        error: {}
      };
      const state = feedReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки ленты');
    });
  });

  describe('Асинхронное действие fetchUserOrders', () => {
    it('должен сохранять заказы пользователя при fulfilled', () => {
      const userOrders = [mockOrder];
      const action = {
        type: fetchUserOrders.fulfilled.type,
        payload: userOrders
      };
      const state = feedReducer(initialState, action);

      expect(state.orders).toEqual(userOrders);
    });
  });

  describe('Изменения состояния', () => {
    it('должен очищать ошибку при новом запросе после предыдущей ошибки', () => {
      const stateWithError = {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: 'Предыдущая ошибка'
      };

      const state = feedReducer(stateWithError, {
        type: fetchFeeds.pending.type
      });

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сохранять существующие данные при загрузке новых', () => {
      const stateWithData = {
        orders: [mockOrder],
        total: 100,
        totalToday: 10,
        loading: false,
        error: null
      };

      const state = feedReducer(stateWithData, {
        type: fetchFeeds.pending.type
      });

      expect(state.loading).toBe(true);
      expect(state.orders).toEqual([mockOrder]);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(10);
    });
  });
});
