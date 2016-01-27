var express = require('express'),
    config  = require('./config/config'),
    app     = express();

require('./config/config_express')(app, config);
require('./config/config_mongoose')(config);
require('./config/config_passport')(app, config);
require('./config/routes_web')(app);
require('./config/routes_auth')(app);

app.listen(config.port, function (err) {
    if (err) {
        console.log('Failed to start server: ', err);
    } else {
        console.log('Server started on port ' + config.port);
    }
});