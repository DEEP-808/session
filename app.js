var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var config = require('./backend/config/config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbconnect=require('./backend/lib/dbConnect');
var MongoStore = require('connect-mongo');

require('./backend/lib/dbSetup').createUsers();

var app = express();
dbconnect.connect();

app.use(session({
    resave:false, 
    saveUninitialized:false, 
    secret:config.session_secret, 
    store: MongoStore.create({ mongoUrl: config.MONGO_connectStr})
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/', indexRouter);
app.use('/api', usersRouter);

var port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("server started at localhost:3000");
})
