import constructorReducer, {
  initialState,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';
import { TConstructorIngredient } from '@utils-types';

describe('Тесты для constructorSlice', () => {
  const mockBun: TConstructorIngredient = {
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
    image_mobile: 'test-image-mobile.png',
    id: 'test-id-1'
  };

  const mockIngredient: TConstructorIngredient = {
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
    image_mobile: 'test-image-mobile.png',
    id: 'test-id-2'
  };

  const mockSauce: TConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'test-image.png',
    image_large: 'test-image-large.png',
    image_mobile: 'test-image-mobile.png',
    id: 'test-id-3'
  };

  describe('Добавление ингредиентов', () => {
    it('должен добавлять булку в конструктор', () => {
      const action = addIngredient(mockBun);
      const state = constructorReducer(initialState, action);

      expect(state.bun).toEqual(
        expect.objectContaining({
          ...mockBun,
          id: expect.any(String)
        })
      );
      expect(state.ingredients).toEqual([]);
    });

    it('должен заменять существующую булку при добавлении новой', () => {
      const stateWithBun = {
        bun: mockBun,
        ingredients: []
      };

      const newBun = { ...mockBun, name: 'Новая булка', _id: 'new-bun-id' };
      const action = addIngredient(newBun);
      const state = constructorReducer(stateWithBun, action);

      expect(state.bun).toEqual(
        expect.objectContaining({
          ...newBun,
          id: expect.any(String)
        })
      );
    });

    it('должен добавлять начинку в конструктор', () => {
      const action = addIngredient(mockIngredient);
      const state = constructorReducer(initialState, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(
        expect.objectContaining({
          ...mockIngredient,
          id: expect.any(String)
        })
      );
    });

    it('должен добавлять несколько ингредиентов', () => {
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      state = constructorReducer(state, addIngredient(mockSauce));

      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients[0].name).toBe(mockIngredient.name);
      expect(state.ingredients[1].name).toBe(mockSauce.name);
    });
  });

  describe('Удаление ингредиентов', () => {
    it('должен удалять ингредиент по id', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [
          { ...mockIngredient, id: 'test-id-1' },
          { ...mockSauce, id: 'test-id-2' }
        ]
      };

      const action = removeIngredient('test-id-1');
      const state = constructorReducer(stateWithIngredients, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].id).toBe('test-id-2');
    });

    it('не должен изменять состояние если ингредиент не найден', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [{ ...mockIngredient, id: 'test-id-1' }]
      };

      const action = removeIngredient('non-existent-id');
      const state = constructorReducer(stateWithIngredients, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0].id).toBe('test-id-1');
    });
  });

  describe('Перемещение ингредиентов', () => {
    it('должен перемещать ингредиент между позициями', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [
          { ...mockIngredient, id: 'test-id-1', name: 'First' },
          { ...mockSauce, id: 'test-id-2', name: 'Second' },
          { ...mockIngredient, id: 'test-id-3', name: 'Third' }
        ]
      };

      const action = moveIngredient({ from: 0, to: 2 });
      const state = constructorReducer(stateWithIngredients, action);

      expect(state.ingredients[0].name).toBe('Second');
      expect(state.ingredients[1].name).toBe('Third');
      expect(state.ingredients[2].name).toBe('First');
    });

    it('должен перемещать ингредиент в начало', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [
          { ...mockIngredient, id: 'test-id-1', name: 'First' },
          { ...mockSauce, id: 'test-id-2', name: 'Second' }
        ]
      };

      const action = moveIngredient({ from: 1, to: 0 });
      const state = constructorReducer(stateWithIngredients, action);

      expect(state.ingredients[0].name).toBe('Second');
      expect(state.ingredients[1].name).toBe('First');
    });
  });

  describe('Очистка конструктора', () => {
    it('должен очищать все ингредиенты и булку', () => {
      const stateWithData = {
        bun: mockBun,
        ingredients: [mockIngredient, mockSauce]
      };

      const action = clearConstructor();
      const state = constructorReducer(stateWithData, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients).toEqual([]);
    });

    it('не должен изменять пустое состояние', () => {
      const action = clearConstructor();
      const state = constructorReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });
});
