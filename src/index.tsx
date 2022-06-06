import React, { StrictMode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import './configs/i18n/config';
//* import './scss/style.scss';
//* import './assets/scss/style.scss';
// import { AbilityContext } from './utility/context/Can';
// import ability from './configs/acl/ability';
// import { ThemeContext } from './utility/context/ThemeColors';
// import { ToastContainer } from 'react-toastify';

import '../public/scss/bootstrap.scss'
 import '../public/fonts/css/fontawesome-all.min.css'
 import '../public/scss/style.scss'

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

