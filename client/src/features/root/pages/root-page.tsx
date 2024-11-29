import { Link } from 'react-router-dom';
import { RootRoutes } from '../routes/root-routes.tsx';

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

export const RootPage = () => {
	return (
		<div>
			<h1>RootPage</h1>
			<Navigation />
			<RootRoutes />
		</div>
	);
};
