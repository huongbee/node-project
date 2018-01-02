const express = require('express');
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const app = express();

mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect('mongodb://localhost/project', {
        useMongoClient: true
    })
    .then(() => console.log('Mongoose connected!...'))
    .catch(err => console.log('Errorrrr.........'))

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

const port = 3000;


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


app.listen(port, () => {
    console.log(`Server start on port ${port}`)
})