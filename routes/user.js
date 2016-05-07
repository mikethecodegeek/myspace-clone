var express = require('express');
var router = express.Router();
var User = require('../models/user');


router.get('/', (req,res)=> {

     User.find({})
        .exec((err, data) => {
            if (err) {
                console.log(err)
            }
            else {
                res.send(data);
            }

        });
});

router.post('/wall',User.isLoggedIn, (req,res)=> {

    var client = new User(req.body);
    client.save((err)=> {
        if (err){
            console.log(err);
        } else {
            res.send(client);
        }
    });

});




router.post('/register', (req,res) => {
    User.register(req.body, err=> {
        res.cookie('testcookie', 'ok.cookie');
        res.status(err ? 400 : 200).send(err);
    })
})

router.get('/profile', User.isLoggedIn, (req,res) => {
    console.log(req);
    res.send(req.user);
})

router.post('/logout', User.isLoggedIn, (req,res) => {
    res.clearCookie('accessToken');
    res.send(req.user);
})

router.post('/login', (req,res) => {
    User.authenticate(req.body, (err, token) => {
        if (err){
            res.send(err);
        }
        else {
            res.cookie('accessToken', token).send(token);
        }
    })
});


router.get('/:id', (req,res)=> {
    console.log(req.params.id)
    User.findById(req.params.id, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);
        }
    })
});


router.delete('/:id', User.isLoggedIn, (req,res)=> {
    User.findByIdAndRemove(req.params.id, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.put('/:id', User.isLoggedIn, (req,res)=> {
    User.findByIdAndUpdate(req.params.id,{$set: req.body}, {new:true}, (err,data)=> {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});





module.exports = router;

