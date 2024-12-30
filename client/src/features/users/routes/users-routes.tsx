import { Routes, Route } from 'react-router-dom';
import { UsersMain } from '../pages/users-main.tsx';
import { UsersList } from '../pages/users-list.tsx';

export const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersMain />}>
        <Route path="list" element={<UsersList />} />
        {/*<Route path="second" element={<Second />} />*/}
      </Route>
    </Routes>
  );
};
