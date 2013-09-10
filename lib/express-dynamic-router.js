//module dependencies
var fs = require("fs")
, _ = require('underscore');


  /**
  * String _costumeRoutesDir
  * @private
  */
  var _costumeRoutesDir = null,

  /**
  * String _indexAction
  * @private
  */
  _indexAction = null,

  /**
  * Object _ignoreMap
  * @private
  */
  _ignoreMap = {}

  /**
  * Array _applies
  * @private
  */  
  , _applies = []
  ;


module.exports = {
  
  setRoutesDir : function(path){
    _costumeRoutesDir = path;
    return this;
  },
  
  getRoutesDir : function(){
    return _costumeRoutesDir;
  },

  getRouteAction : function(){
    return _indexAction;
  },

  route : function(routeAction){
    this.index(routeAction);
    return this;
  },

  index : function(routeAction){
    _indexAction = routeAction;
    return this;
  },

  ignore : function(ignoreMap){
    _ignoreMap = ignoreMap;
    return this;
  },

  applyOnly : function(applies){
    _applies = applies;
    return this;
  },

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
      app.patch(routeName, funcVal);
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
    },
    isApply = function(routeName){
      if(_applies.length > 0){
        return _.contains(_applies, routeName);
      }
      return true;
    };

    //Set index action which is accecible your-domain.com/
    if(_indexAction != null){
      registRoutes('/', _indexAction);
    }
    
    //register
    for(var ite in files){
      var fileName = files[ite];
      var stats = fs.statSync(routeDir + "/" + fileName);

      //Proceed auto registration if the file is not a directory.
      if(stats.isDirectory()) continue;
      
      var routeName = fileName.replace(".js", "")

      if(!isApply(routeName)) continue;

      var route = require(routeDir + "/" + routeName);

      _.each(route, function(funcVal, action){
        if(!isIgnore(routeName, action)){
          if(action == "index") registRoutes("/" + routeName, funcVal);
          registRoutes("/" + routeName + "/" + action+'*', funcVal);
        }
      });

    }
  }
};
