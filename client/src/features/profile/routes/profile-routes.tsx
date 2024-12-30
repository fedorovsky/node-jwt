import { Routes, Route } from 'react-router-dom';
import { ProfilePage } from '../pages/profile-page';
import { ProfileViewPage } from '../pages/profile-view-page.tsx';
import { ProfileEditPage } from '../pages/profile-edit-page.tsx';

export const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />}>
        <Route path="view" element={<ProfileViewPage />} />
        <Route path="edit" element={<ProfileEditPage />} />
      </Route>
    </Routes>
  );
};
