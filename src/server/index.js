import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
//import mongoose from 'mongoose';
import createError from 'http-errors';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';
//import api from './api';

/**
 * Starts app with config
 *
 * @param  {String} config config to start app as (test, development, etc)
 */
export function start(config) {
  process.env.NODE_ENV = config;
  const app = express();

 // const dbName = (app.get('env') === 'test') ? 'quiz_test' : 'quiz';
 // const db = mongoose.connect('mongodb://localhost/' + dbName).connection;
 // db.on('error', console.error.bind(console, 'connection error'));
  //mongoose.Promise = Promise;

  // Setup webpack on dev

  if (app.get('env') === 'development') {
	 
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
  }

  app.use(bodyParser.json());

  // Mount api routes at /api
  app.use('/api', api);

  // Send SPA on all routes except /api, so they can 404 normally
  app.get(/^(?!\/api).*$/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
  });

  // Error handlers
  app.use((err, req, res, next) => {
    console.error(err);
    const { statusCode, message, errors } = err;
    res.status(statusCode || 500).json({ message, errors });
  });

  //app.use((req, res, next) => {
  //  const err = createError(404);
  //  res.status(404).json({ message: err.message });
 // });

  
  /**
  const server = app.listen(8008, 'localhost', () => {
    const { address, port } = server.address();
    console.log('Server listening at http://%s:%s', address, port);
  });
  
//var express = require('express');

var app = express.createServer(express.logger());

var server = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
  
  **/
  app.listen(8008, function () {
  console.log('Example app listening on port 8008!');
  });
  
  //return server;
  
}
