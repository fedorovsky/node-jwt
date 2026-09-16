import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import { ProfileEditPage } from './profile-edit-page';
import { ProfileViewPage } from './profile-view-page';

export const ProfileRoutes = () => (
  <ProtectedRoute>
    <Routes>
      <Route path="view" element={<ProfileViewPage />} />
      <Route path="edit" element={<ProfileEditPage />} />
      <Route path="*" element={<Navigate to={ROUTES.profile} replace />} />
    </Routes>
  </ProtectedRoute>
);
