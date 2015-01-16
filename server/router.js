var express       = require('express');
var eventRouter   = require('./api/events');

module.exports = function (app, passport) {
  
  app.use('/api/events', eventRouter);

};