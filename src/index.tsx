import React, { StrictMode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import { ToastContainer } from 'react-toastify';
import './scss/core.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
// ** i18n
import './configs/i18n';
import { Spinner } from 'reactstrap';

const LazyApp = lazy(() => import('./App'));

ReactDOM.render(
  <Provider store={Store}>
    <Suspense fallback={<Spinner />}>
      {/* <AbilityContext.Provider > */}
      <LazyApp />
      <ToastContainer newestOnTop />
      {/* </AbilityContext.Provider> */}
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
