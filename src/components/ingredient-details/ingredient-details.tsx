import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const { ingredients, loading, error } = useSelector(
    (state) => state.ingredients
  );

  const ingredientData = useMemo(
    () => ingredients.find((ingredient) => ingredient._id === id),
    [ingredients, id]
  );

  useEffect(() => {
    if (!loading && !error && ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length, loading, error, id]);

  if (loading || !ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData!} />;
};
