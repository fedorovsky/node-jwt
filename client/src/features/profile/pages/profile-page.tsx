import { Outlet } from 'react-router-dom';

export const ProfilePage = () => {
  return (
    <div>
      <h1 className='text-4xl font-bold text-gray-800 tracking-tight leading-tight mb-4'>
        Profile
      </h1>
      <Outlet />
    </div>
  );
};
