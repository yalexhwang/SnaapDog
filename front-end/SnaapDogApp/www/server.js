var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(1111, function(){
    console.log('Listening on port 1111...');
});

