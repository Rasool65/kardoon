import Routers from './router/Router';
import { FunctionComponent, useEffect } from 'react';
import $ from 'jquery';
const App: FunctionComponent = () => {
  useEffect(() => {
    $(require('./utils/custom.js'));
    // require('./utils/custom');
  }, []);
  return <Routers />;
};

export default App;
