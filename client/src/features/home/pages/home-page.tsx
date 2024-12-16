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
      <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-gray-800">
        Home
      </h1>
      <Button onClick={handleClick}>fetch</Button>
    </div>
  );
};
