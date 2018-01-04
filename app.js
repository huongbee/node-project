const express = require('express');
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session')



const app = express();

mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect('mongodb://localhost/project', {
        useMongoClient: true
    })
    .then(() => console.log('Mongoose connected!...')) ///usr/local/bin/mongodb
    .catch(err => console.log('Errorrrr.........'))

//load Ideamodel
require('./models/idea');
const Idea = mongoose.model('ideas'); //select * from ideas

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
app.use(flash())
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
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

app.get('/ideas/add', (req, res) => {
    res.render('ideas/add')
});
app.get('/ideas', (req, res) => {
    Idea.find({}).sort({
            date: 'desc'
        })
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            })
        })

});
app.post('/ideas', (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({
            text: 'Plz enter title'
        })
    }
    if (!req.body.detail) {
        errors.push({
            text: 'Plz enter detail'
        })
    }
    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            detail: req.body.detail
        })
    } else {
        //res.send('success')
        const newUser = {
            title: req.body.title,
            detail: req.body.detail //off line 9 models/idea.js
        }
        new Idea(newUser).save().then(idea => {
            req.flash('success_msg', "Add successfully")
            res.redirect('/ideas');
        })
    }
    console.log(req.body)
    //res.send('ok')
});

app.get('/ideas/edit/:id', (req, res) => {
    Idea.findById(req.params.id)
        // Idea.findOne({
        //     _id: req.params.id
        // })
        .then(idea => {
            res.render('ideas/edit', {
                idea: idea
            })
        })

});
app.put('/ideas/:id', (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({
            text: 'Plz enter title'
        })
    }
    if (!req.body.detail) {
        errors.push({
            text: 'Plz enter detail'
        })
    }
    if (errors.length > 0) {
        res.render('ideas/edit/:', {
            errors: errors,
            title: req.body.title,
            detail: req.body.detail
        })
    } else {
        Idea.findOne({
            _id: req.params.id
        }).then(idea => {
            idea.title = req.body.title;
            idea.detail = req.body.detail;
            idea.date = Date.now();
            idea.save().then(idea => {
                req.flash('success_msg', "Update successfully")
                res.redirect('/ideas');
            })
        })

    }
    console.log(req.body)
    //res.send('ok')
});

app.delete('/ideas/:id', (req, res) => {
    Idea.remove({
        _id: req.params.id
    }).then(idea => {
        req.flash('success_msg', "Deleted! ")
        res.redirect('/ideas');
    })

});




const port = 3000;
app.listen(port, () => {
    console.log(`Server start on port ${port}`)
})