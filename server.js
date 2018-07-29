const express = require('express');
const app = express();

app.set('port', process.env.PORT || 4000);
app.use(express.static(require('path').join(__dirname, '/client/note_practice/public')));
app.set('client', require('path').join(__dirname, '/client/note_practice/public/'));

require('./settings').config(app);
require('./settings').routeApp(app);

app.listen(app.get('port'), () => {
    console.log('Express server listening on port %d', app.get('port'));
});