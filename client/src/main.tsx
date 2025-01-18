import ReactDOM from 'react-dom/client';
import { App } from './app/app';
import '@/modules/styled-system/tailwind.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />,
);
