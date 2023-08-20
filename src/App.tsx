import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';

import router from './router';
import 'scss/main.scss';

const App = (): JSX.Element => {
  return <BrowserRouter>{renderRoutes(router)}</BrowserRouter>;
};

export default App;
