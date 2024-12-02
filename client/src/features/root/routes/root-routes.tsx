import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/features/home';
import { ProfileRoutes } from '@/features/profile';
import { AuthRoutes } from '@/features/auth';

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth/*' element={<AuthRoutes />} />
      <Route path='/profile/*' element={<ProfileRoutes />} />
    </Routes>
  );
};
