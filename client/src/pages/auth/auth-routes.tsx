import { Routes, Route } from 'react-router-dom';
import { AuthLoginPage } from './auth-login-page';
import { AuthRegisterPage } from './auth-register-page.tsx';
import { AuthPage } from './auth-page.tsx';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />}>
        <Route path="login" element={<AuthLoginPage />} />
        <Route path="register" element={<AuthRegisterPage />} />
      </Route>
    </Routes>
  );
};
