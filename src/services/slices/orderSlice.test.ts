import orderReducer, {
  initialState,
  createOrder,
  fetchOrderByNumber,
  clearOrder,
  setOrderModalData,
  clearOrderModalData
} from './orderSlice';
import { TOrder } from '@utils-types';

describe('Тесты для orderSlice', () => {
  const mockOrder: TOrder = {
    _id: '643d69a5c3f7b9001cfa093c',
    status: 'done',
    name: 'Тестовый бургер',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 12345,
    ingredients: ['643d69a5c3f7b9001cfa093c']
  };

  describe('Асинхронное действие createOrder', () => {
    it('должен устанавливать orderRequest в true при pending', () => {
      const action = { type: createOrder.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сохранять данные заказа и устанавливать orderRequest в false при fulfilled', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.order).toEqual(mockOrder);
      expect(state.orderModalData).toEqual(mockOrder);
      expect(state.error).toBeNull();
    });

    it('должен сохранять ошибку и устанавливать orderRequest в false при rejected', () => {
      const errorMessage = 'Ошибка создания заказа';
      const action = {
        type: createOrder.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    it('должен использовать стандартное сообщение об ошибке, если оно не предоставлено', () => {
      const action = {
        type: createOrder.rejected.type,
        error: {}
      };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe('Ошибка создания заказа');
    });
  });

  describe('Асинхронное действие fetchOrderByNumber', () => {
    it('должен устанавливать orderRequest в true при pending', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(true);
    });

    it('должен сохранять данные заказа и устанавливать orderRequest в false при fulfilled', () => {
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockOrder);
    });

    it('должен сохранять ошибку и устанавливать orderRequest в false при rejected', () => {
      const errorMessage = 'Ошибка загрузки заказа';
      const action = {
        type: fetchOrderByNumber.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    it('должен использовать стандартное сообщение об ошибке, если оно не предоставлено', () => {
      const action = {
        type: fetchOrderByNumber.rejected.type,
        error: {}
      };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe('Ошибка загрузки заказа');
    });
  });

  describe('Синхронные действия', () => {
    it('должен очищать все данные заказа при вызове clearOrder', () => {
      const stateWithData = {
        order: mockOrder,
        orderRequest: false,
        orderModalData: mockOrder,
        error: 'Ошибка'
      };

      const action = clearOrder();
      const state = orderReducer(stateWithData, action);

      expect(state.order).toBeNull();
      expect(state.orderModalData).toBeNull();
      expect(state.error).toBeNull();
      expect(state.orderRequest).toBe(false);
    });

    it('должен сохранять данные заказа в orderModalData при вызове setOrderModalData', () => {
      const action = setOrderModalData(mockOrder);
      const state = orderReducer(initialState, action);

      expect(state.orderModalData).toEqual(mockOrder);
    });

    it('должен очищать orderModalData при вызове clearOrderModalData', () => {
      const stateWithModalData = {
        ...initialState,
        orderModalData: mockOrder
      };

      const action = clearOrderModalData();
      const state = orderReducer(stateWithModalData, action);

      expect(state.orderModalData).toBeNull();
    });
  });
});
