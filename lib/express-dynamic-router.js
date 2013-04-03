//module dependencies
var fs = require("fs");

/**
 * void extendedForEach
 * getable key and iterator in object and array loop
 * @param mix obj
 * @param function callback
 */
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

//module exports
exports.register = function(app){
  var moduleRoot = "node_modules/express-dynamic-router/lib";
  var routeDir = __dirname.replace(moduleRoot, "routes"),
  files = fs.readdirSync(routeDir);
  
  
  /*
  * void registRoutes
  * @param string routeName
  * @param function funcval
  */
  function registRoutes(routeName, funcVal){
    app.get(routeName, funcVal);
    app.post(routeName, funcVal);
  }
  
  //register routes under approot/routes direcotry
  files.forEach(function(line){
    var routeName = line.replace(".js", "");
    var route = require(routeDir + "/" + routeName);
    extendedForEach(route, function(key, value, iterator){
      registRoutes("/" + routeName + "/" + key, value);
    })
  });
}
