import { RootRoutes } from '../routes/root-routes';
import { Header } from '@/features/root/components/header';
import { Footer } from '@/features/root/components/footer';
import { useValidateToken } from '@/features/auth/hooks/use-validate-token.ts';

export const RootPage = () => {
  useValidateToken();

  return (
    <div className="flex h-screen flex-col">
      <header className="bg-primary text-white">
        <Header />
      </header>
      <main className="flex-1 overflow-y-auto p-5">
        <RootRoutes />
      </main>
      <footer className="bg-primary py-4 text-white">
        <Footer />
      </footer>
    </div>
  );
};
