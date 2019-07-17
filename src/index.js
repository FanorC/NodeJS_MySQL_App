const express= require ('express');
const morgan= require ('morgan');
const exphbs= require ('express-handlebars');
const path  = require ('path');
const flash= require ('connect-flash')
const session= require('express-session')
const MysqlSession = require('express-mysql-session')
const {database}= require('./keys')
const passport= require('passport')

//initializations
const app= express();
require('./lib/passport');
// settings

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));

app.engine('.hbs', exphbs({
 defaultLayout :'main',
 layoutsDir: path.join(app.get('views'),'layouts'),
 partialsDir: path.join(app.get('views'),'partials'),
 extname: '.hbs',
 helpers: require('./lib/handelbars')
 }));

app.set('view engine','.hbs');

//Middelware
app.use(morgan ('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(flash());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MysqlSession(database)
} ));

app.use(passport.initialize());
app.use(passport.session());
//Global Variable
app.use((req,res,next)=> {
    
    app.locals.success=req.flash('success');
    app.locals.message=req.flash('message');
    next();
});


//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

//Starting the server
app.listen(app.get('port'),()=>{console.log('port ok ', app.get('port'))});

//Public
app.use(express.static(path.join(__dirname,'public')));