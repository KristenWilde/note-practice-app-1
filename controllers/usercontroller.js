const User = require('./../models/user');
const mailer = require('nodemailer');
const formidable = require('formidable');
const secrets = require('./../secrets');

let transport = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: secrets.email,
        pass: secrets.password
    }
});

module.exports = {
    register: (req, res) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if (user) {
                res.status(500).send('User with given email exists');
            }
            else {
                User.findOne({username: req.body.username}, (err, user) => {
                    if (user) {
                        res.status(500).send('User with given username exists');
                    }
                    else {
                        let newuser = new User({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            dob: new Date(req.body.dob),
                            email: req.body.email,
                            username: req.body.username,
                            isOfAge: {
                                isVerified: require('moment')().diff(req.body.dob, 'years') >= 14
                            }
                        });
                
                        newuser.validate((err) => {
                            if (err) {
                                res.status(500).send('Error Occured While Registering User');
                                console.log(err);
                            }
                            else {
                                newuser.createPassword(req.body.password);
                                newuser.save();
                                if (newuser.isOfAge.isVerified) {
                                    res.status(200).json(newuser);
                                }
                                else {
                                    res.redirect('/verify'+newuser.firstname+'/'+newuser.lastname);
                                }
                            }
                        });
                    }
                });
            }
        });

        
    },
    sendVerification: (req, res) => {
        User.findOne({firstname: req.params.first}, (err, user) => {
            if (req.body.email === user.email) {
                res.status(500).send("That's your email. Enter a parent's email");
            }
            else {
                transport.sendMail({
                    from: '"Kingsley Victor" <javaprodigy56@gmail.com>',
                    to: req.body.email,
                    html: 'User with the name '+user.firstname+' '+user.lastname+' registered to use an app at <a href="/">Music Notes App</a> and needs your permission to use the app as the person is underaged. <br/> Click the below link to grant consent <br/> <a href="/:userid/:date"'
                }, (err, info) => {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        res.redirect('/');
                        console.log(info);
                    }
                });
            }
    });
    }

}