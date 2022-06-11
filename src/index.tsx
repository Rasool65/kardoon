import React, { StrictMode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import { ToastContainer } from 'react-toastify';
import './configs/i18n/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.scss';
import './scss/style.css';
import './scss/rrc_style.scss';
import 'react-toastify/dist/ReactToastify.css';

const LazyApp = lazy(() => import('./App'));

ReactDOM.render(
  <Provider store={Store}>
    <Suspense fallback={<></>}>
      <LazyApp />
      <ToastContainer newestOnTop />
    </Suspense>
  </Provider>,
  document.getElementById('root')
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
