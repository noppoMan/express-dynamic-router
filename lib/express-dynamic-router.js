var fs = require("fs");

exports.register = function(app){
  var moduleRoot = "node_modules/express-dynamic-router/lib";
  var routeDir = __dirname.replace(moduleRoot, "routes"),
  files = fs.readdirSync(routeDir);

  for(var i in files){
    var routeName = files[i].replace(".js", "");
    var route = require(routeDir + "/" + routeName);
    for(var action in route){
      app.get("/" + routeName + '/' + action, route[action]);
      app.post("/" + routeName + '/' + action, route[action]);
    }
  }
}