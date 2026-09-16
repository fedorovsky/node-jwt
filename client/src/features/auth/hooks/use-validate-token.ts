import { useEffect } from 'react';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { validateToken } from '../redux/thunks';

/** Runs the session check once when the app mounts. */
export const useValidateToken = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);
};
