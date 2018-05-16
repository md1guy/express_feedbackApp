const express = require('express');
const app = express();
var path = require('path');

const indexRouter = require('./routes/index');

var port = process.env.PORT || '3000';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(port, () => console.log('Server is working on port 3000 now.'));