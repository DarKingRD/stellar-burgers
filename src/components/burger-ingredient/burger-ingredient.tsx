import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import { addIngredient } from '../../services/slices/constructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const { bun, ingredients } = useSelector(
      (state) => state.burgerConstructor
    );

    const ingredientCount =
      ingredient.type === 'bun'
        ? bun?._id === ingredient._id
          ? 2
          : 0
        : ingredients.filter((item) => item._id === ingredient._id).length;

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={ingredientCount}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
