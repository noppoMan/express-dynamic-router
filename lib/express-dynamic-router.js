//module dependencies
var fs = require("fs")
, _ = require('underscore');


  /**
  * string _costumeRoutesDir
  * @private
  */
  var _costumeRoutesDir = null,

  /**
  * string _indexAction
  * @private
  */
  _indexAction = null,

  /**
  * string _ignoreMap
  * @private
  */
  _ignoreMap = {}
  ;


module.exports = {
  /**
   * void setRoutesDir
   * @param string path
   */
  setRoutesDir : function(path){
    _costumeRoutesDir = path;
    return this;
  },
  
  /**
   * string getRoutesDir
   * @public
   */
  getRoutesDir : function(){
    return _costumeRoutesDir;
  },

  /**
   * string getRouteAction
   * @public
   */
  getRouteAction : function(){
    return _indexAction;
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
    _indexAction = routeAction;
    return this;
  },
  /**
  * void ignore
  * @public
  */
  ignore : function(ignoreMap){
    _ignoreMap = ignoreMap;
    return this;
  },
  /**
   * void register
   * dynamic register routes under your routes direcotry
   * @param express object app
   */
  register : function(app){

    //Get read target routes dir.
    var routeDir;
    if(_costumeRoutesDir != null){
      routeDir = _costumeRoutesDir;
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
    var registRoutes = function(routeName, funcVal){
      app.get(routeName, funcVal);
      app.post(routeName, funcVal);
      app.put(routeName, funcVal);
      app.delete(routeName, funcVal);
    },
    isIgnore = function(routeName, action){
      for(var i in _ignoreMap){
        var ignoreRoute = (i == '/*') ? routeName : i;
        if(ignoreRoute == routeName){
          if(_.contains(_ignoreMap[i], action)){
            return true;
          }
        }
      }
      return false;
    }

    //Set index action which is accecible your-domain.com/
    if(_indexAction != null)
      registRoutes('/', _indexAction);
    
    //register
    files.forEach(function(line){
      var stats = fs.statSync(routeDir + "/" + line);

      //Proceed auto registration if the file is not a directory.
      if(!stats.isDirectory()){
        var routeName = line.replace(".js", "")
        , route = require(routeDir + "/" + routeName)
        ;

        _.each(route, function(funcVal, action){
          if(!isIgnore(routeName, action)){
            if(action == "index") registRoutes("/" + routeName, funcVal);
            registRoutes("/" + routeName + "/" + action+'*', funcVal);
          }
        });
      }

    });
  }
};
