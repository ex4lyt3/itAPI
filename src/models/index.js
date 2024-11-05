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
db.comment = require('./comment.js')(sequelize, Sequelize);
db.itinerary = require('./itinerary.js')(sequelize, Sequelize);
db.place = require('./place.js')(sequelize, Sequelize);
db.quiz = require('./quiz.js')(sequelize, Sequelize);
db.question = require('./question.js')(sequelize, Sequelize);

// db.user.associate(db);
// db.comment.associate(db);
// db.itinerary.associate(db);
// db.place.associate(db);
// db.quiz.associate(db);
// db.question.associate(db);

module.exports = db;