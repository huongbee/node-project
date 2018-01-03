const express = require('express');
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const app = express();

mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect('mongodb://localhost/project', {
        useMongoClient: true
    })
    .then(() => console.log('Mongoose connected!...'))
    .catch(err => console.log('Errorrrr.........'))

//load Ideamodel
require('./models/idea');
const Idea = mongoose.model('ideas');

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// bodyParser middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

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
        res.send('success')
    }
    console.log(req.body)
    //res.send('ok')
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server start on port ${port}`)
})