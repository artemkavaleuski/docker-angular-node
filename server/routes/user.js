const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Users = require('../models/User');

const router = express.Router();

router.post('/login', function (req, res) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Auth error',
                user: user
            });
        }
       req.login(user, { session: false }, (err) => {
           if (err) {
               res.send(err);
           }
           const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
           return res.json({user, token});
        });
    })(req, res);
});

router.post('/signup', async (req, res) => {
    try {
        const { email , password, username } = req.body;
        const check = await Users.findOne({ email })
        if (check) {
            return res.status(422).send({
                error: 'Email already exist',
            })
        }
        const user = new Users();
        user.email = email;
        user.password = bcrypt.hashSync(password, 10);
        user.username = username;
        await user.save()
        return res.status(200).send({
            user,
        })
    } catch {
        return res.status(422).send({
            error: 'Singup error',
        })
    }
});

module.exports = router;
