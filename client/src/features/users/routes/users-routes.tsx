import { Routes, Route } from 'react-router-dom';
import { UsersMain } from '../pages/users-main.tsx';
import { UsersList } from '../pages/users-list.tsx';
import { ProtectedRoute } from '@/features/auth/components/protected-route.tsx';

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersMain />}>
        <Route
          path="list"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />
        {/*<Route path="second" element={<Second />} />*/}
      </Route>
    </Routes>
  );
};
