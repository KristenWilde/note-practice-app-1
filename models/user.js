const Schema = require('mongoose').Schema;

const User = new Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 2
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 2
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        match: /([a-zA-Z]+)(@)(\s+)(.com|.co.uk|.net)/
    },
    username: {
        type: String,
        required: true
    },
    userId: Schema.Types.ObjectId,
    goals: [Object],
    pitches: [Object],
    permittedUsers: [String],
    hashedPasscode: String
});

User.methods.createPassword = (password) => {
    this.hashedPasscode = require('crypto').pbkdf2Sync(password, new Buffer('sh!', 'utf8'), 1000, 64, 'sha512').toString('hex');
};

User.methods.checkPassword = (password) => {
    var hash = require('crypto').pbkdf2Sync(password, new Buffer('sh!', 'utf8'), 1000, 64, 'sha512').toString('hex');

    return hash === this.hashedPasscode;
}
module.exports = require('mongoose').model('User', User);