var fs = require("fs");

function extendedForEach(obj, callback){
  if(typeof(obj) == "object"){
    var iterator =0;
    for(var key in obj){
      callback(key, obj[key], iterator);
      iterator++;
    }
  }else if(typeof(obj) == "array"){
    for(var key in obj){
      callback(key, obj[key]);
    }
  }else{
    throw "You have to give array or object to first arguments";
  }
};

exports.register = function(app){
  var moduleRoot = "node_modules/express-dynamic-router/lib";
  var routeDir = __dirname.replace(moduleRoot, "routes"),
  files = fs.readdirSync(routeDir);

  function registRoutes(routeName, funcVal){
    app.get(routeName, funcVal);
    app.get(routeName, funcVal);
  }

  files.forEach(function(line){
    var routeName = line.replace(".js", "");
    var route = require(routeDir + "/" + routeName);
    extendedForEach(route, function(key, value, iterator){
      registRoutes("/" + routeName + "/" + key, value);
    })
  });
}