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

describe('expressDynamicRouter.register()', function() {
  it('Should app.routes[options] contains path,method,callbaks,keys,regexp kyes', function() {
    expressDynamicRouter.register(app);
    var methods = ['get', 'post', 'put', 'delete', 'patch'];
    for(var i in methods){
      var method = methods[i];
      app.routes.should.have.property(method);
      app.routes[method][0].should.have.property('path');
      app.routes[method][0].should.have.property('method');
      app.routes[method][0].should.have.property('callbacks');
      app.routes[method][0].should.have.property('keys');
      app.routes[method][0].should.have.property('regexp');
    }
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


describe('expressDynamicRouter.ignore()', function() {
  it('Should ignore ignoreTest method', function() {

    expressDynamicRouter
    .index(require(__dirname + '/routes/index').index)
    .ignore({
      '/*' : ['ignoreTest']
    })
    .register(app);

    var isMatch = false;
    for(var i in app.routes.get){
        if(app.routes.get[i].path.match(/ignoreTest/)){
          isMatch = true;
        }
    }
    isMatch.should.not.be.ok
  });
});


describe('expressDynamicRouter.applyOnly()', function() {
  it('Should register only routes/index.js', function() {

    expressDynamicRouter
    .applyOnly(['index'])
    .register(app);

    var isMatch = false;
    for(var i in app.routes.get){
      if(app.routes.get[i].path){
        if(app.routes.get[i].path.match(/\user/)){
          isMatch = true;
        }
      }
    }
    isMatch.should.not.be.ok
  });
});