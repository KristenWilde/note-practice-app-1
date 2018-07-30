//const User = require('./models/user');

module.exports.route = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(require('path').join(app.get('client'), '/index.html'));
    });
    app.post('/register', require('./controllers/usercontroller').register);
}