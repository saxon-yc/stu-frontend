import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';

import { ConfigProvider } from 'antd';

import router from './router';
import 'scss/main.scss';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token，影响范围大
            colorPrimary: '#00b96b',

            // 派生变量，影响范围小
            // colorBgContainer: '#f6ffed',
          },
        }}
      >
        {renderRoutes(router)}
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
