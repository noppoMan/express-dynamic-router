express-dynamic-router
======================

[![Build Status](https://travis-ci.org/noppoMan/express-dynamic-router.png?branch=master)](https://travis-ci.org/noppoMan/express-dynamic-router)
[![NPM version](https://badge.fury.io/js/express-dynamic-router.png)](http://badge.fury.io/js/express-dynamic-router)

#### *Dynamic routing system for express.*


author : Yuki Takei(MikeTOKYO)  
email : yuki@miketokyo.com  


##Overseas
express-dynamic-router provide you the auto routing system for express.

<b>You don't need to write routing codes written in express docs</b>
<pre>
app.get("hellow/world", hellow.world);
app.post("hellow/world", hellow.world);
app.put("hellow/world", hellow.world);
app.delete("hellow/world", hellow.world);
</pre>

<b>You only have to write easy code like bellow</b>
<pre>
require('express-dynamic-router')
.index(require('routes/index').index)
.register(app);
</pre>

##Instalation
<pre>
npm install express-dynamic-router
</pre>

##Usage

express/app.js
<pre>
app.configure('development', function(){
  app.use(express.errorHandler());
});

//use express-dynamic-router
require('express-dynamic-router')
.index(require('routes/index').index) // Set action for index
.register(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
</pre>


<b>If you change routes dir, You only have to add setRoutesDir(path-your-route-dir) on method chain</b>
<pre>
require('express-dynamic-router')
.index(require('routes/index').index)
.setRoutesDir("path-to-your-routes")
.register(app);
</pre>


##Api Reference

### setRoutesDir
Set path to your routes dir (First, dynamic-router browse express/routes, if you don't use this method.)
<pre>
dynamicRouter.setRoutesDir(string path-to-your-custome-routes-dir)
</pre>

### getRoutesDir
Get your routes dir string.
<pre>
dynamicRouter.getRoutesDir()
</pre>


### index
Set index action (accessible http://your-domain.com/)
<pre>
dynamicRouter.index(function indexAction)
</pre>


### ignore
Set ignore actions which you not want to register.
<pre>
dynamicRouter.ignore(object ignoreAction)
</pre>

#### ■usage
<pre>
dynamicRouter
.ignore({
  '*/' : ['hogehoge', 'fugafuga'], // * is applyed to all routes
  'user' : ['initialize', 'beforeRenderHook']
})
</pre>


### register
Register all routes in your routes dir except for actions which are ignored.
<pre>
dynamicRouter.register(object expressApp)
</pre>


##Runing tests
<pre>
mocha test/router.js
</pre>


##License
MIT
