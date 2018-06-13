var express = require('express');
var path = require('path');

var logger = require('morgan');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/DB');
    var app = express();

    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );
    const adUnitRoutes = require('./routes/adunit.route');
var auth = require('./routes/auth');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({'extended':'false'}));
    app.use('/login', express.static(path.join(__dirname, 'dist')));
    app.use('/signup', express.static(path.join(__dirname, 'dist')));
    app.use(passport.initialize());
    app.use('/auth', auth);
    app.use(bodyParser.json());
   // app.use(cors());
    const port = process.env.PORT || 4000;

    app.use('/adunits', adUnitRoutes);

    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });
