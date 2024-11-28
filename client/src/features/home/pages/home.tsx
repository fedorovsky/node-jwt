export const Home = () => {
	const handleClick = async () => {
		const response = await fetch('/api/');
		console.log('==================');
		console.log('response', await response.json());
		console.log('==================');
	};

	return (
		<div>
			<h1>Home</h1>
			<button onClick={handleClick}>fetch</button>
		</div>
	);
};
