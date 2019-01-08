const express = require('express');
const bodyParser = require('body-parser')
var cookies = require("cookie-parser");

var app = express();
app.use(cookies());
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

//error function
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
        message: err.message,
        error: {},
        title: 'error'
    });
});


app.listen(1337);
