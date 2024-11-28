import { Routes, Route } from 'react-router-dom';
import { AuthLogin } from '../pages/auth-login.tsx';
import { AuthRegister } from '../pages/auth-register.tsx';
import { Auth } from '../pages/auth.tsx';

export const AuthRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Auth />}>
				<Route path="login" element={<AuthLogin />} />
				<Route path="register" element={<AuthRegister />} />
			</Route>
		</Routes>
	);
};
