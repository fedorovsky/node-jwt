import { Outlet } from 'react-router-dom';

export const AuthPage = () => {
	return (
		<div>
			<h1>Auth</h1>
			<Outlet />
		</div>
	);
};
