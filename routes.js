module.exports.route = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(require('path').join(app.get('client'), '/index.html'));
    });
}