var express    = require('express');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var flash      = require('connect-flash');

function expressMiddleware (app) {
  app.use(allowCors);
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
}


function allowCors(req, res, next) {
  res.set(defaultCorsHeaders);
  if (req.method === 'OPTIONS') {
    return res.send(200);
  }
  next();
}

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Allow": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports = {
  express: expressMiddleware,
};