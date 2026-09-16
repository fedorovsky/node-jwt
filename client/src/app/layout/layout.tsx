import { Outlet } from 'react-router-dom';
import { useValidateToken } from '@/features/auth';
import { Footer } from './footer';
import { Header } from './header';

export const Layout = () => {
  useValidateToken();

  return (
    <div className="flex h-screen flex-col">
      <header className="bg-primary text-primary-foreground">
        <Header />
      </header>
      <main className="container mx-auto flex-1 overflow-y-auto p-5">
        <Outlet />
      </main>
      <footer className="bg-primary py-4 text-primary-foreground">
        <Footer />
      </footer>
    </div>
  );
};
