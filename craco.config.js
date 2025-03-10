const path = require('path');

const _resolve = (dir) => path.resolve(__dirname, dir);
const devServer = require('./dev.server.config');

module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,

  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.stats = 'errors-only'; //这样才会生效
      // 修改build的生成文件名称
      paths.appBuild = 'dist';
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
      }; //修改输出为dist文件
      // console.log(webpackConfig);//不懂怎样修改的可以看一下webpackConfig有啥，然后对它的一直配置进行修改。
      return webpackConfig;
    },
    alias: {
      utils: _resolve('src/utils'),
      constants: _resolve('src/constants'),
      apis: _resolve('src/apis'),
      router: _resolve('src/router'),
      components: _resolve('src/components'),
      layouts: _resolve('src/layouts'),
      hooks: _resolve('src/hooks'),
      scss: _resolve('src/scss'),
      static: _resolve('src/static'),
    },
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },

  devServer: devServer,
};
