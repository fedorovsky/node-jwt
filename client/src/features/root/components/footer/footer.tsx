export const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white py-4">
			<div className="container mx-auto text-center">
				<p className="text-sm">
					© {new Date().getFullYear()} My Website. All rights reserved.
				</p>
			</div>
		</footer>
	);
};
