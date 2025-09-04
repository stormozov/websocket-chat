import { merge } from 'webpack-merge';
import common from './webpack.common.mjs';
import path from 'path';

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(import.meta.dirname, '..', 'dist'),
    },
    open: true,
    hot: true,
    port: process.env.FRONT_PORT,
    historyApiFallback: true,
    devMiddleware: {
      publicPath: '/',
      writeToDisk: true,
    },
  },
});
