express-dynamic-router
======================

#### *Dynamic routing system for express.*


author : Yuki Takei(MikeTOKYO)  
email : yuki@miketokyo.com  

##Overseas
express-dynamic-router provide you the auto routing system for express.

<b>You don't need to write routing codes like below</b>
<pre>
app.get("hellow/world", hellow.world);
app.post("hellow/world", hellow.world);
app.put("hellow/world", hellow.world);
app.delete("hellow/world", hellow.world);
</pre>

<b>You only have to write one line code like bellow</b>
<pre>
require('express-dynamic-router').register(app);
</pre>

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
