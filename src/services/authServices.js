const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');

const User = db.user;
const Op = db.Sequelize.Op;

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'myfancysecret';

function generateAccessToken(username) {
    return jwt.sign(username, TOKEN_SECRET, { expiresIn: '1800s'})
}

async function create(body) {
    const username = body.username;
    const password = body.password;
    if (username == null || password == null) {
        return;
    }
    console.log(username);
    console.log(password);
    const hash = bcrypt.hashSync(password, 10);
    const userid = Math.floor(Math.random() * 1000000);
    try {
        const new_user = await User.create({
            userid: userid,
            username: username,
            password: hash
        });
    } catch (error) {
        console.error(error);
    }
}

async function getUserId(username) {
    try {
        const user = await User.findOne({
            where: {
                username: username
            }
        });
        return user.userid;
    } catch (error) {
        console.error(error);
        return;
    }
}

async function authenticate(body) {
    const username = body.username;
    const password = body.password;
    if (username == null || password == null) {
        return;
    }
    try {
        const user = await User.findOne({
            where: {
                username: username
            }
        });
        console.log(user);
        if (user == null) {
            return;
        }
        if (bcrypt.compareSync(password, user.password)) {
            return generateAccessToken({username: username});
        }
    } catch (error) {
        console.error(error);
        return;
    }
}

async function getUserId(token) {
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return;
        }
        const username = user.username;
        const user = User.findOne({
            where: {
                username: username
            }
        });
        return user.userid;
    })
}

async function getUsername(token) {
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return;
        }
        if (user.username === username) {
            return true;
        }
        return false;
    })
}

function logout(body) {
    return;
}

function refreshToken(body) {
    if (body.refreshToken == null) {
        return;
    }
    const refreshToken = body.refreshToken;
    jwt.verify(refreshToken, TOKEN_SECRET, (err, user) => {
        if (err) {
            return;
        }
        return generateAccessToken({username: user.username});
    })
}

module.exports = {
    create,
    authenticate,
    logout,
    refreshToken
}