import { RootRoutes } from '../routes/root-routes';
import { Header } from '@/features/root/components/header';
import { Footer } from '@/features/root/components/footer';

export const RootPage = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-grow container mx-auto py-4">
				<RootRoutes />
			</main>
			<Footer />
		</div>
	);
};
