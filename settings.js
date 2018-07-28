module.exports = {
    config : (app) => {
        app.use(require('morgan')('dev'));
        console.log('App configured');
    },
    routeApp : (app) => {
        require('./routes').route(app);
        console.log('App routed');
    }
}