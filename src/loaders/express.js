const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const HttpStatus = require('http-status-codes');
const { errors } = require('celebrate');
const { Logger } = require('../utilities');

const router = require('../routes');
const { Response } = require('../utilities');

exports.loadModules = ({ app }) => {
  // Add security headers
  app.use(helmet());

  // HTTP request logger
  app.use(morgan('dev'));

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(
    cors({
      methods: ['GET, POST, PUT, PATCH, DELETE, OPTIONS'],
      allowedHeaders: ['content-type, authorization, device-platform, app-version'],
      origin: true,
    }),
  );

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json());

  app.use(
    express.urlencoded({
      extended: true, // to support URL-encoded bodies
    }),
  );

  // Load API routes
  router.loadRoutes(app);

  // handle errors from 'celebrate'
  app.use(errors());

  app.use((req, res, next) => {
    Logger.error(`Received request: ${req.method} ${req.url}`);
    next();
  });

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error(`Route ${req.url} Not Found`);
    err.status = HttpStatus.NOT_FOUND;
    next(err);
  });

  // error handlers
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res) => {
    const errorCode = err.code || HttpStatus.INTERNAL_SERVER_ERROR;
    return Response.fail(res, err.message, errorCode);
  });
};
