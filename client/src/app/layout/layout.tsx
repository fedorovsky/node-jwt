import { Outlet } from 'react-router-dom';
import { Header } from './header';
import { Footer } from './footer';
import { useValidateToken } from '@/features/auth/hooks/use-validate-token.ts';

export const Layout = () => {
  useValidateToken();

  return (
    <div className="flex h-screen flex-col">
      <header className="bg-primary text-white">
        <Header />
      </header>
      <main className="flex-1 overflow-y-auto p-5">
        <Outlet />
      </main>
      <footer className="bg-primary py-4 text-white">
        <Footer />
      </footer>
    </div>
  );
};
