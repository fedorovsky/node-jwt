import { RootRoutes } from '../routes/root-routes';
import { Header } from '@/features/root/components/header';
import { Footer } from '@/features/root/components/footer';

export const RootPage = () => {
  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-primary text-white'>
        <Header />
      </header>
      <main className='flex-1 overflow-y-auto p-5'>
        <RootRoutes />
      </main>
      <footer className='bg-primary text-white py-4'>
        <Footer />
      </footer>
    </div>
  );
};
