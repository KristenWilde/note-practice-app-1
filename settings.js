module.exports = {
    config : (app) => {
        app.use(require('morgan')('dev'));
        app.use((err, req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
        });
        console.log('App configured');
    },
    routeApp : (app) => {
        require('./routes').route(app);
        console.log('App routed');
    }
}