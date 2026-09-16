import ReactDOM from 'react-dom/client';
import { App } from './app/app';
import '@/shared/styled-system/tailwind.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found');

ReactDOM.createRoot(rootElement).render(<App />);
