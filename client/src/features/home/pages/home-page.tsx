export const HomePage = () => {
  const handleClick = async () => {
    const response = await fetch('/api/');
    console.log('==================');
    console.log('response', await response.json());
    console.log('==================');
  };

  return (
    <div>
      <h1 className='text-4xl font-bold text-gray-800 tracking-tight leading-tight mb-4'>Home</h1>
      <button
        className='px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600'
        onClick={handleClick}
      >
        fetch
      </button>
    </div>
  );
};
