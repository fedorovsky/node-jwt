import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<nav className="container mx-auto p-4">
			<ul className="flex space-x-4">
				<li>
					<Link to="/" className="text-white hover:text-gray-400">
						Home
					</Link>
				</li>
				<li>
					<Link to="/profile" className="text-white hover:text-gray-400">
						Profile
					</Link>
				</li>
				<li>
					<Link to="/auth" className="text-white hover:text-gray-400">
						Auth
					</Link>
					<ul className="ml-4 mt-2 space-y-2">
						<li>
							<Link to="/auth/login" className="text-gray-300 hover:text-white">
								Auth - Login
							</Link>
						</li>
						<li>
							<Link
								to="/auth/register"
								className="text-gray-300 hover:text-white"
							>
								Auth - Register
							</Link>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	);
};
