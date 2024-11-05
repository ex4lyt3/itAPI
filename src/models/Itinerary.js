module.exports = (sequelize, DataTypes) => {
    const Itinerary = sequelize.define('Itinerary', {
        itineraryid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        placesDescription: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
        },
        preferences: {
            type: DataTypes.STRING ,
            allowNull: false,
            primaryKey: false
        }
    })

    Itinerary.associate = (models) => {
        Itinerary.belongsTo(models.User, {
            foreignKey: 'userid',
            onDelete: 'CASCADE'
        }),
        Itinerary.hasMany(models.Comment, {
            foreignKey: 'itineraryid',
            as: 'comments',
        });
    }

    return Itinerary;
}