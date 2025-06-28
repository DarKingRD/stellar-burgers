import ingredientsReducer, {
  fetchIngredients,
  initialState
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('Тесты для ingredientsSlice', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'test-image.png',
      image_large: 'test-image-large.png',
      image_mobile: 'test-image-mobile.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'test-image.png',
      image_large: 'test-image-large.png',
      image_mobile: 'test-image-mobile.png'
    }
  ];

  describe('Асинхронное действие fetchIngredients', () => {
    it('должен устанавливать loading в true при pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен сохранять ингредиенты и устанавливать loading в false при fulfilled', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.ingredients).toEqual(mockIngredients);
      expect(state.error).toBeNull();
    });

    it('должен сохранять ошибку и устанавливать loading в false при rejected', () => {
      const errorMessage = 'Ошибка загрузки ингредиентов';
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: errorMessage }
      };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.ingredients).toEqual([]);
    });

    it('должен использовать стандартное сообщение об ошибке, если оно не предоставлено', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        error: {}
      };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки ингредиентов');
      expect(state.ingredients).toEqual([]);
    });
  });

  describe('Изменения состояния', () => {
    it('должен корректно обрабатывать несколько циклов pending-fulfilled', () => {
      let state = ingredientsReducer(initialState, {
        type: fetchIngredients.pending.type
      });
      expect(state.loading).toBe(true);

      state = ingredientsReducer(state, {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      });
      expect(state.loading).toBe(false);
      expect(state.ingredients).toEqual(mockIngredients);

      state = ingredientsReducer(state, {
        type: fetchIngredients.pending.type
      });
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен очищать ошибку при новом запросе после предыдущей ошибки', () => {
      const stateWithError = {
        ingredients: [],
        loading: false,
        error: 'Предыдущая ошибка'
      };

      const state = ingredientsReducer(stateWithError, {
        type: fetchIngredients.pending.type
      });

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });
  });
});
