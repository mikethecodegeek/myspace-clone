/**
 * Created by Admin on 5/6/16.
 */
'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

var userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    pic: {type: String || 'https://d13yacurqjgara.cloudfront.net/users/291/screenshots/290124/defaultuser.png'},
    bio: {type: String}
});

userSchema.statics.register = function(userObj, cb) {
    this.create(userObj, cb);
};

userSchema.statics.authenticate = function(userObj, cb){
    console.log('USEROBJ: ', userObj);
    this.findOne({username: userObj.username}, (err, user) => {
        if (err || !user){
            return cb(err || {error: 'User not found'})
        }
        if (user.password !== userObj.password) {
            return cb({error: 'Login failed. Please check your username and password'})
        }
        else {
            var token = user.makeToken();
        }
        cb(null, token);
    })
};

userSchema.statics.isLoggedIn = function(req, res, next) {
    console.log('REQUEST COOKIES: ',req.cookies);
    var userToken = req.cookies.accessToken;
    jwt.verify(userToken, JWT_SECRET, (err, payload) => {
        if (err) return res.status(401).send({error: 'No way dude'});
        User.findById(payload._id, (err, user) => {
            if (err){
                res.send(err);
            }
            req.user = user;
            next();
        }).select('-password');
    })

}

userSchema.methods.makeToken = function() {
    var token = jwt.sign({
        _id: this._id
    }, JWT_SECRET)
    return token;
}

var User = mongoose.model('User', userSchema);

module.exports = User;
