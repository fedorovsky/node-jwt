import { Outlet } from 'react-router-dom';

export const AuthPage = () => {
  return (
    <div>
      <h1 className='text-4xl font-bold text-gray-800 tracking-tight leading-tight mb-4'>Auth</h1>
      <Outlet />
    </div>
  );
};
