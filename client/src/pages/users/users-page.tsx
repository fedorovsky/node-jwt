import { Outlet } from 'react-router-dom';

export const UsersPage = () => {
  return (
    <div>
      <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-gray-800">
        Users
      </h2>
      <Outlet />
    </div>
  );
};
