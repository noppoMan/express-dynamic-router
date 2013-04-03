var fs = require("fs");

exports.register = function(app){
  var files = fs.readdirSync(__dirname);

  console.log(__dirname);

  //app.get('/', routes.index);

}