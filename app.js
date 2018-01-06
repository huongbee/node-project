const express = require('express');
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport')

const app = express();

mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect('mongodb://localhost/project', {
        useMongoClient: true
    })
    .then(() => console.log('Mongoose connected!...')) ///usr/local/bin/mongodb
    .catch(err => console.log('Errorrrr.........'))

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// bodyParser middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

//Method-Override middleware
app.use(methodOverride('_method'))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
    next()
})


app.get('/', (req, res) => {
    //console.log(req.name)
    const title = "Home Page"
    res.render('index', {
        title: title
    });
});

app.get('/about', (req, res) => {
    res.render('about')
});

//load route
const ideas = require('./routes/ideas')
app.use('/ideas', ideas)

const users = require('./routes/users')
app.use('/users', users)

//passport config
require('./config/passport')(passport);

const port = 3000;
app.listen(port, () => {
    console.log(`Server start on port ${port}`)
})