import { Routes, Route } from 'react-router-dom';
import { AuthLoginPage } from '../pages/auth-login-page';
import { AuthRegisterPage } from '../pages/auth-register-page';
import { AuthPage } from '../pages/auth-page';

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
