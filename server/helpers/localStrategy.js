const bcrypt=require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/User');

const localStrategy = new LocalStrategy(
  (username, password, done) => {
    return Users
      .findOne({ username })
      .then((user) => {
        console.log(user, bcrypt.compareSync(password, user.password))
        if (!user) {
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((err)  => {
        if (err) {
           return done(err);
        }
      });
  },
);


module.exports = localStrategy