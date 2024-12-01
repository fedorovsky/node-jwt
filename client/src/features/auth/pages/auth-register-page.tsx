export const AuthRegisterPage = () => {
	return (
		<div className="flex items-center justify-center">
			<form
				onSubmit={() => null}
				className="w-full max-w-sm bg-white p-6 rounded-lg border border-gray-300"
			>
				<h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
					Register
				</h2>
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-600"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						placeholder="Enter your email"
						className="w-full mt-1 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-600"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						placeholder="Enter your password"
						className="w-full mt-1 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
						required
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="confirm-password"
						className="block text-sm font-medium text-gray-600"
					>
						Confirm Password
					</label>
					<input
						type="password"
						id="confirm-password"
						placeholder="Confirm your password"
						className="w-full mt-1 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
				>
					Register
				</button>
			</form>
		</div>
	);
};