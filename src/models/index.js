const dbConfig = require('../config/dbConfig.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.js')(sequelize, Sequelize);
db.itinerary = require('./itinerary.js')(sequelize, Sequelize);
db.comment = require('./comment.js')(sequelize, Sequelize);
db.place = require('./place.js')(sequelize, Sequelize);
db.quiz = require('./quiz.js')(sequelize, Sequelize);
db.question = require('./question.js')(sequelize, Sequelize);

// Check if associate method exists before calling it
if (db.user.associate) {
    db.user.associate(db);
}
if (db.itinerary.associate) {
    db.itinerary.associate(db);
}
if (db.comment.associate) {
    db.comment.associate(db);
}
if (db.place.associate) {
    db.place.associate(db);
}
if (db.quiz.associate) {
    db.quiz.associate(db);
}
if (db.question.associate) {
    db.question.associate(db);
}

module.exports = db;