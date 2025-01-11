import { useEffect } from 'react';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { validateToken } from '../redux/thunks';

export const useValidateToken = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);
};
