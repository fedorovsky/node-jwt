import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from '../features/home/pages/home.tsx';
import { AuthRoutes } from '../features/auth/routes/auth-routes.tsx';
import { Profile } from '../features/profile/pages/profile.tsx';

function Navigation() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">home</Link>
				</li>
				<li>
					<Link to="/profile">profile</Link>
				</li>
				<li>
					<Link to="/auth">auth</Link>
					<ul>
						<li>
							<Link to="/auth/login">auth-login</Link>
						</li>
						<li>
							<Link to="/auth/register">auth-register</Link>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	);
}

export const RootRoutes: React.FC = () => {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth/*" element={<AuthRoutes />} />
				<Route path="/profile/*" element={<Profile />} />
			</Routes>
		</>
	);
};
