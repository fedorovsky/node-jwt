import { Routes, Route } from 'react-router-dom';
import { UsersPage } from '../pages/users-page.tsx';

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />}>
        {/*<Route path="first" element={<First />} />*/}
        {/*<Route path="second" element={<Second />} />*/}
      </Route>
    </Routes>
  );
};
