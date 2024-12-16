import { Routes, Route } from 'react-router-dom';
import { ProfilePage } from '../pages/profile-page';

export const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfilePage />}>
        {/*<Route path="first" element={<First />} />*/}
        {/*<Route path="second" element={<Second />} />*/}
      </Route>
    </Routes>
  );
};
