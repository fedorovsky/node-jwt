import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/features/auth';
import { UsersPage } from './users-page.tsx';
import { UsersListPage } from './users-list-page.tsx';

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />}>
        <Route
          path="list"
          element={
            <ProtectedRoute>
              <UsersListPage />
            </ProtectedRoute>
          }
        />
        {/*<Route path="second" element={<Second />} />*/}
      </Route>
    </Routes>
  );
};
