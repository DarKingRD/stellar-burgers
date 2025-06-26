import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error, total, totalToday } = useSelector(
    (state) => state.feed
  );

  useEffect(() => {
    dispatch(fetchFeeds());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
    dispatch(fetchIngredients());
  };

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    console.error('Feed error:', error);
    alert(error);
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
