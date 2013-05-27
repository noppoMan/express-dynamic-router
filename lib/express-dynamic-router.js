//module dependencies
var fs = require("fs")
, _ = require('underscore');


module.exports = {

  _costumeRoutesDir : null,

  _routeAction : null,

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

  getRouteAction : function(){
    return this._routeAction;
  },

  route : function(routeAction){
    this._routeAction = routeAction;
    return this;
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
      app.put(routeName, funcVal);
      app.delete(routeName, funcVal);
    }

    if(this._routeAction != null)
      registRoutes('/', this._routeAction);
    
    //register
    files.forEach(function(line){
      var routeName = line.replace(".js", "");

      var route = require(routeDir + "/" + routeName);
      _.each(route, function(funcVal, action){
        if(action == "index"){
          registRoutes("/" + routeName, funcVal);
        }
        registRoutes("/" + routeName + "/" + action, funcVal);
      })
    });
  }
};
