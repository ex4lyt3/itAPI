const authServices = require('../services/authServices');

async function create(req, res, next) {
  try {
    console.log(req.body);
    const user = await authServices.create(req.body);
    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function authenticate(req, res, next) {
    try {
        console.log(req.body);
        const user = await authServices.authenticate(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function logout(req, res, next) {
    try {
        await authServices.logout(req.body);
        res.json({});
    } catch (error) {
        next(error);
    }
}

async function refreshToken(req, res, next) {
    try {
        const user = await authServices.refreshToken(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function getUsername(req, res, next) {
    try {
        const username = await authServices.getUsername(req.body.userid);
        console.log(username)
        res.json(username);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create,
    authenticate,
    logout,
    refreshToken,
    getUsername
}