import { Routes, Route } from 'react-router-dom';
import { Profile } from '../pages/profile.tsx';

export const ProfileRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Profile />}>
				{/*<Route path="first" element={<First />} />*/}
				{/*<Route path="second" element={<Second />} />*/}
			</Route>
		</Routes>
	);
};
