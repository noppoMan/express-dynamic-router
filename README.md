express-dynamic-router
======================

#### *Dynamic routing system for express.*


author : Yuki Takei(MikeTOKYO)  
email : yuki@miketokyo.com  

##Instalation
<pre>
npm install express-dynamic-router
</pre>

##Usage

express_root/app.js

<pre>
app.get("/" routes.index);
require('express-dynamic-router').register(app);
</pre>


<b>If you change routes dir, please write like as below</b>
<pre>
app.get("/" routes.index);
require('express-dynamic-router').setRoutesDir("path-to-your-routes").register(app);
</pre>


##Runing tests
<pre>
mocha --reporter spec router.js
</pre>


##License
MIT
