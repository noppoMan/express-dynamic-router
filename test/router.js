var express = require('express')
	, expressDynamicRouter = require('../lib/express-dynamic-router')
	, should = require('should');

var app, req;
//setup
beforeEach(function() {
  app = express();
  expressDynamicRouter.setRoutesDir('../test/routes');
});


describe('Should setable costome routes dir', function() {
  it('Should result value of expressDynamicRouter.getRoutesDir() equals expected value', function() {
    expressDynamicRouter.getRoutesDir().should.equal('../test/routes');
  });
});


describe('should registerd routes', function() {
  it('Should results value of app.routes.get equals expected value', function() {
    expressDynamicRouter.register(app);
    app.routes.get[0].should.have.property('path');
    app.routes.get[0].should.have.property('method');
    app.routes.get[0].should.have.property('callbacks');
    app.routes.get[0].should.have.property('keys');
    app.routes.get[0].should.have.property('regexp');
  });
});