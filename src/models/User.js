module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
        },
    })
    // User.associate = (models) => {
    //     User.hasMany(models.Itinerary, {
    //         foreignKey: 'userid',
    //         as: 'itineraries',
    //     });
    // }
    return User;
}