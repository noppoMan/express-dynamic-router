var express = require('express')
	, expressDynamicRouter = require('../lib/express-dynamic-router')
	, should = require('should');

var app, req;
//setup
beforeEach(function() {
  app = express();
  expressDynamicRouter.setRoutesDir(__dirname + '/routes');
});


describe('expressDynamicRouter.setRoutesDir()', function() {
  it('Should result value of expressDynamicRouter.getRoutesDir() equals ' + __dirname + '/routes', function() {
    expressDynamicRouter.getRoutesDir().should.equal(__dirname + '/routes');
  });
});


describe('expressDynamicRouter.index()', function() {
  it('Should results value of app.routes.get[0].path equals /', function() {
    expressDynamicRouter
    .index(require(__dirname + '/routes/index').index)
    .register(app);
    app.routes.get[0].path.should.equal('/');
  });
});

describe('expressDynamicRouter.register()', function() {
  it('Should results value of app.routes.get contains path,method,callbaks,keys,regexp', function() {
    expressDynamicRouter.register(app);
    app.routes.get[0].should.have.property('path');
    app.routes.get[0].should.have.property('method');
    app.routes.get[0].should.have.property('callbacks');
    app.routes.get[0].should.have.property('keys');
    app.routes.get[0].should.have.property('regexp');
  });
});
