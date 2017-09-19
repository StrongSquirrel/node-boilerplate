/* eslint no-console: ["error", { allow: ["log", "info"] }] */
import 'babel-polyfill';

import http from 'http';
import express from 'express';
import nunjucks from 'nunjucks';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from 'config';
import path from 'path';
import flash from 'connect-flash';
import session from 'express-session';
import apiRoutes from 'routes';

const app = express();
app.server = http.createServer(app);

// middlewares
const logFormat = config.util.getEnv('NODE_ENV') === 'production' ? 'short' : 'dev';
app.use(morgan(logFormat, {
  skip: () => config.util.getEnv('NODE_ENV') === 'test',
}));
app.use(bodyParser.urlencoded({ extended: false }));

nunjucks.configure(path.resolve(__dirname, 'views'), {
  autoescape: true,
  noCache: config.util.getEnv('NODE_ENV') === 'development',
  express: app,
});
app.set('view engine', 'njk');
app.use(session({
  secret: config.get('sessionSecret'),
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

app.use(apiRoutes);

// error handlers
app.use((req, res) => {
  res.status(404);
  res.json({
    status: 404,
    data: {
      message: 'You requested unavailable resource',
    },
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.log(err);
  res.json({
    status: err.status || 500,
    data: { message: 'Internal server error' },
  });
});

app.server.listen(config.get('port'), () => {
  console.info(`Started on host ${app.server.address().address} and port ${app.server.address().port}`);
});

export default app;
