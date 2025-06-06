const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');

const User = db.user;
const Op = db.Sequelize.Op;

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'myfancysecret';

function generateAccessToken(username) {
    return jwt.sign(username, TOKEN_SECRET, { expiresIn: '180000000s'})
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

    const new_user = await User.create({
        userid: userid,
        username: username,
        password: hash
    });
}

async function getUserId(username) {
    const user = await User.findOne({
        where: {
            username: username
        }
    });
    console.log("user: " + user.userid);   
    return user.userid;
}

async function authenticate(body) {
    const username = body.username;
    const password = body.password;
    if (username == null || password == null) {
        return;
    }

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
        return generateAccessToken({ username: username });
    }
}

async function getUsername(userid) {
    console.log(typeof userid)
    const user = await User.findOne({
        where: {
            userid: parseInt(userid)
        }
    })
    console.log("user: " + user.username);

    return user.username;
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
    refreshToken,
    getUserId,
    getUsername
}