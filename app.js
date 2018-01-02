const express = require('express');
const exphbs = require('express-handlebars')
const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

const port = 3000;

app.use(function (req, res, next) {
    //console.log(Date.now());
    req.name = "Huong"
    next();
})


app.get('/', (req, res) => {
    //console.log(req.name)
    res.send(req.name);
});

app.get('/about', (req, res) => {
    res.send('ABOUT1 askd');
});


app.listen(port, () => {
    console.log(`Server start on port ${port}`)
})