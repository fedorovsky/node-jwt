import { Routes, Route } from 'react-router-dom';
import { Home } from '../../home/pages/home.tsx';
import { Profile } from '../../profile/pages/profile.tsx';
import { AuthRoutes } from '../../auth/routes/auth-routes.tsx';

export const RootRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/auth/*" element={<AuthRoutes />} />
			<Route path="/profile/*" element={<Profile />} />
		</Routes>
	);
};
