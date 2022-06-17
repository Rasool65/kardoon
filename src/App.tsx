// @ts-nocheck
import Routers from './router/Router';
import { FunctionComponent, useEffect } from 'react';

const App: FunctionComponent = () => {

  useEffect(() => {
    require('./utils/custom');
  }, [])

  return <Routers />;
};

export default App;
