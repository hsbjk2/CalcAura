import {createRoot} from 'react-dom/client';
import 'katex/dist/katex.min.css';
import App from './App.tsx';
import { I18nProvider } from './i18n/I18nContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import './index.css';
import './styles/pages.css';

createRoot(document.getElementById('root')!).render(
  <I18nProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </I18nProvider>
);

