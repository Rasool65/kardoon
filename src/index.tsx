import React, { StrictMode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Store from './redux/Store';
import './scss/style.scss';
import './configs/i18n/config';
import './assets/scss/style.scss';
// import { AbilityContext } from './utility/context/Can';
// import ability from './configs/acl/ability';
// import { ThemeContext } from './utility/context/ThemeColors';
// import { ToastContainer } from 'react-toastify';
// import './assets/fonts/feather/iconfont.css';
// import './scss/core.scss';
// import './scss/react/app-loader.scss';
// import 'react-perfect-scrollbar/dist/css/styles.css';
// import '@styles/react/libs/toastify/toastify.scss';

const LazyApp = lazy(() => import('./App'));

ReactDOM.render(
  <Provider store={Store}>
    {/* <Suspense fallback={<Spinner />}> */}
    <Suspense fallback={<></>}>
      {/* <AbilityContext.Provider value={ability}> */}
      {/* <ThemeContext> */}
      <LazyApp />
      {/* <ToastContainer newestOnTop /> */}
      {/* </ThemeContext> */}
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
