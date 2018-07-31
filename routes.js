//const User = require('./models/user');

module.exports.route = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(require('path').join(app.get('client'), '/index.html'));
    });
    //Testing handlebars template
    app.get('/verify/:firstname/:lastname', (req, res) => {
        res.render('verify', {name: req.params.firstname, lastname: req.params.lastname});
    })
    app.post('/register', require('./controllers/usercontroller').register);
    app.post('/sendlink/:first/:last', require('./controllers/usercontroller').sendVerification);
}