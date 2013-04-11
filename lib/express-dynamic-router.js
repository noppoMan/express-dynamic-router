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
  }else{
    throw new Error("You have to give array or object to first arguments");
  }
};



var expressDynamicRouter = {

  _costumeRoutesDir : null,
  /**
   * void setRoutesDir
   * @param string path
   */
  setRoutesDir : function(path){
    this._costumeRoutesDir = path;
    return this;
  },
  
  /**
   * string getRoutesDir
   */
  getRoutesDir : function(){
    return this._costumeRoutesDir;
  },
  
  /**
   * void register
   * dynamic register routes under approot/routes direcotry
   * @param express object app
   */
  register : function(app){
    var routeDir;
    if(this._costumeRoutesDir != null){
      routeDir = this._costumeRoutesDir;
    }else{
      var moduleRoot = "node_modules/express-dynamic-router/lib";
      routeDir = __dirname.replace(moduleRoot, "routes");
    }
    
    var files = fs.readdirSync(routeDir);
    
    /*
    * void registRoutes
    * @param string routeName
    * @param function funcval
    */
    function registRoutes(routeName, funcVal){
      app.get(routeName, funcVal);
      app.post(routeName, funcVal);
    }
    
    //register
    files.forEach(function(line){
      var routeName = line.replace(".js", "");
      var route = require(routeDir + "/" + routeName);
      extendedForEach(route, function(action, funcVal, iterator){
        if(action == "index"){
          registRoutes("/" + routeName, funcVal);
        }
        registRoutes("/" + routeName + "/" + action, funcVal);
      })
    });
  }
}

module.exports = expressDynamicRouter;
