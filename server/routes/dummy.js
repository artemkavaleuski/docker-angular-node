const express = require('express');
const router = express.Router();
const passport = require('passport');
const Dummies = require('../models/Dummy');

router.get('/', passport.authenticate('jwt', { session: false }), async (_req, res) => {
    const dummy = await Dummies.findOne();
    return res.status(200).send({
        dummy
    })
});

module.exports = router;
