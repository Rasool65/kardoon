import { Suspense, lazy } from 'react';
import { Spinner } from 'reactstrap';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import { ToastContainer } from 'react-toastify';
import './configs/i18n/config';
import './scss/core.scss';
import 'react-toastify/dist/ReactToastify.css';
import './scss/scripts/bootstrap.min.js';

const LazyApp = lazy(() => import('./App'));
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={Store}>
    <Suspense fallback={<Spinner />}>
      <LazyApp />
      <ToastContainer newestOnTop />
    </Suspense>
  </Provider>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
