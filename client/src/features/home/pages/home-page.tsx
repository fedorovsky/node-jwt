import { Button } from '@/shared/components/ui/button';

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
      <Button onClick={handleClick}>fetch</Button>
    </div>
  );
};
