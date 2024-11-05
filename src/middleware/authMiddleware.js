const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'myfancysecret';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // Changed to lowercase 'authorization'
    console.log(authHeader);
    if (authHeader == null) return res.sendStatus(401);
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    //if (token == null) return res.sendStatus(401);
    
    jwt.verify(authHeader, TOKEN_SECRET, (err, user) => {
        console.log(err);

        if (err) return res.sendStatus(403);

        req.user = user;
        console.log(req.user);

        next();
    });
}

module.exports = {
    authenticateToken
}