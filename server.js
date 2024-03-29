const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayout);
app.use(express.static('public'));

//Connect to database
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: "true",
    useUnifiedTopology: "true"
});

//Check for connection
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000);