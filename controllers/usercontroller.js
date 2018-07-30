const User = require('./../models/user');
const mailer = require('nodemailer');
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
                                    transport.sendMail({
                                        from: 'javaprodigy56@gmail.com',
                                        to: newuser.email,
                                        html: 'Click the below link to activate profile, <br/> /validate/'+newuser._id
                                    }, (err, info) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            console.log(info);
                                            res.status(200).json(newuser);
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });

        
    }
}