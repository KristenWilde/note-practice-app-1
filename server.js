const express = require('express');
const app = express();
const mongoose = require('mongoose');

let mongooseOptions = {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
};

app.set('port', process.env.PORT || 4000);
app.use(express.static(require('path').join(__dirname, '/statics')));
//app.use(express.static(require('path').join(__dirname, '/views')));
app.set('client', require('path').join(__dirname, '/client/note_practice/public/'));
app.set('views', require('path').join(__dirname, '/views'));

require('./settings').config(app);
require('./settings').routeApp(app);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port %d', app.get('port'));
    mongoose.connect('mongodb://localhost:27017/notetestdb', mongooseOptions, () => {
        console.log('Mongoose connected');
    });
});