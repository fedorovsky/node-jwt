import { Outlet } from 'react-router-dom';

export const ProfilePage = () => {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-gray-800">
        Profile
      </h1>
      <Outlet />
    </div>
  );
};
