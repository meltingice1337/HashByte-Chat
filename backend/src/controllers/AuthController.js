const express = require('express');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const uuid4 = require('uuid/v4');

const InvalidBodyError = require('../errors/InvalidBodyError');
const AuthenticationError = require('../errors/AuthenticationError');
const UserExistent = require('../errors/UserExistent');

const AuthController = (db) => {
    const router = express.Router();

    const hasCorrectUserBody = (req) => {
        const bodyKeys = Object.keys(req.body);
        return ['username', 'password'].every(item => bodyKeys.includes(item)) && bodyKeys.length === 2;
    }

    router.post('/register', async (req, res, next) => {
        if (hasCorrectUserBody(req)) {
            const user = db.get('users')
                .find({ username: req.body.username })
                .value();

            if (!user) {
                const newUser = {
                    id: shortid.generate(),
                    username: req.body.username,
                    password: bcrypt.hashSync(req.body.password, 8)
                }

                db.get('users')
                    .push(newUser)
                    .write()

                res.send({ id: newUser.id, username: newUser.username });
            } else {
                next(new UserExistent());
            }
        }
        else {
            next(new InvalidBodyError());
        }
    });

    router.post('/login', async (req, res, next) => {
        if (hasCorrectUserBody(req)) {
            const user = db.get('users')
                .find({ username: req.body.username })
                .value();

            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                const token = uuid4();
                user.token = token;
                db.get('users')
                    .find({ username: req.body.username })
                    .assign(user)
                    .write();
                res.send({ token });

            } else {
                next(new AuthenticationError());
            }
        }
        else {
            next(new InvalidBodyError());
        }
    })

    return router;
}

module.exports = AuthController;