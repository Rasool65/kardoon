import Routers from './router/Router';
import { FunctionComponent, useEffect } from 'react';
import { CustomFunctions } from './utils/custom';

const App: FunctionComponent = () => {
  // useEffect(() => {
  //   CustomFunctions();
  // }, []);

  return <Routers />;
};

export default App;
