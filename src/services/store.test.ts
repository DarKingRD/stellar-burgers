import store from './store';
import RootReduce from './store';
import { configureStore } from '@reduxjs/toolkit';

describe('Конфигурация хранилища', () => {
  it('должен корректно инициализировать rootReducer', () => {
    const initialState = store.getState();

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('feed');

    expect(initialState.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });

    expect(initialState.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect(initialState.order).toEqual({
      order: null,
      orderRequest: false,
      orderModalData: null,
      error: null
    });

    expect(initialState.user).toEqual({
      user: null,
      isAuthenticated: false,
      isAuthChecked: false,
      loginUserRequest: false,
      loginUserError: null,
      registerUserRequest: false,
      registerUserError: null
    });

    expect(initialState.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null
    });
  });

  it('должен создавать хранилище с правильной конфигурацией', () => {
    expect(store).toBeDefined();
    expect(typeof store.dispatch).toBe('function');
    expect(typeof store.getState).toBe('function');
  });
});
