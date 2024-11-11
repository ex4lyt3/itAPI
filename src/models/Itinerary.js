module.exports = (sequelize, DataTypes) => {
    const Itinerary = sequelize.define('Itinerary', {
        itineraryid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        userid: { // Add userid column
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        placesDescription: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
        },
        popularity: {
            type: DataTypes.ENUM('Underrated', 'Popular'),
            allowNull: false,
            primaryKey: false
        },
        budget: {
            type: DataTypes.ENUM('low', 'high'),
            allowNull: false,
            primaryKey: false
        },
        cuisine: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
        },
        
    });

    Itinerary.associate = (models) => {
        Itinerary.belongsTo(models.user, {
            foreignKey: 'userid',
            onDelete: 'CASCADE'
        }),
        Itinerary.hasMany(models.comment, {
            foreignKey: 'itineraryid',
            as: 'comments',
        });
    }

    return Itinerary;
}