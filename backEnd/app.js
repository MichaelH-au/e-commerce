const express = require('express');
const bodyParser = require('body-parser')
var cookies = require("cookie-parser");

var app = express();
app.use(cookies());
app.use(bodyParser.json())
const usersRouter = require('./routes/users');

app.use('/api/users', usersRouter);

//error function
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
        message: err.message,
        error: {},
        title: 'error'
    });
});


app.listen(1337);
