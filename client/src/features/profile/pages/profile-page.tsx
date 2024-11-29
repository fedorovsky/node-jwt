import { Outlet } from 'react-router-dom';

export const ProfilePage = () => {
	return (
		<div>
			<h1>Profile</h1>
			<Outlet />
		</div>
	);
};
