const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');

const app = express();
const proxy = require('http-proxy-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);

const environment = process.env.NODE_ENV || 'dev';

const hosts = {
  dev: 'https://stage.elastic.snaplogic.com',
}
console.log(hosts[environment])
app.use('/api', proxy({ target: hosts[environment], changeOrigin: true }));

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});