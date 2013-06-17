//module dependencies
var fs = require("fs")
, _ = require('underscore');


module.exports = {

  /**
  * string _costumeRoutesDir
  * @private
  */
  _costumeRoutesDir : null,

  /**
  * string _indexAction
  * @private
  */
  _indexAction : null,

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
   * @public
   */
  getRoutesDir : function(){
    return this._costumeRoutesDir;
  },

  /**
   * string getRouteAction
   * @public
   */
  getRouteAction : function(){
    return this._indexAction;
  },

  /**
  * object route (compatible previous version)
  * @public
  */
  route : function(routeAction){
    this.index(routeAction);
    return this;
  },

  /**
  * object index
  * @public
  */
  index : function(routeAction){
    this._indexAction = routeAction;
    return this;
  },
  
  /**
   * void register
   * dynamic register routes under your routes direcotry
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

    //Set action of route
    if(this._indexAction != null)
      registRoutes('/', this._indexAction);
    
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
