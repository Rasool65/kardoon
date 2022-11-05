import { Suspense, lazy } from 'react';
import { Spinner } from 'reactstrap';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import Store, { RootStateType } from './redux/Store';
import { ToastContainer } from 'react-toastify';
import { SignalR } from './components/signalR/SignalR';
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
      <SignalR />
      <ToastContainer newestOnTop />
    </Suspense>
  </Provider>
);

if ('_serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/_service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
