import ReactDOM from 'react-dom/client';
import { App } from './app/app';
import '@/shared/styled-system/tailwind.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />,
);
