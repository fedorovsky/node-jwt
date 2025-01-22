import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/features/auth';
import { ProfilePage } from './profile-page.tsx';
import { ProfileViewPage } from './profile-view-page.tsx';
import { ProfileEditPage } from './profile-edit-page.tsx';

export const ProfileRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      >
        <Route path="view" element={<ProfileViewPage />} />
        <Route path="edit" element={<ProfileEditPage />} />
      </Route>
    </Routes>
  );
};
