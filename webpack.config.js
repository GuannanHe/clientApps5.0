const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.svg'],
    alias: {
      Assets: path.resolve(__dirname, 'src/images'),
      App: path.resolve(__dirname, 'src/app'),
      Context: path.resolve(__dirname, 'src/app/contexts'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/SL_UI'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-transform-runtime',
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-export-default-from',
            ],
          }
        }
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/i,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/SL_UI'),
        ],
        loader: 'url-loader',
      },
      {
        test: /\.scss$/i,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
              localsConvention: 'camelCase',
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        include: [path.resolve(__dirname, 'node_modules/SL_UI')],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Snaplogic',
      template: 'src/index.html',
      inject: 'body',
      favicon: 'src/images/favicon.ico',
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  }
};