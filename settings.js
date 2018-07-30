const hbs = require('express-handlebars');

module.exports = {
    config : (app) => {
        app.use(require('body-parser')({extended: true}))
        app.use(require('morgan')('dev'));
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
            next();
        });
        app.engine('hbs', hbs({
            defaultLayout: 'main',
            layoutsDir: require('path').join(app.get('views'), '/layouts'),
            extname: '.hbs'
        }));
        app.set('view engine', 'hbs');
        console.log('App configured');
    },
    routeApp : (app) => {
        require('./routes').route(app);
        console.log('App routed');
    }
}