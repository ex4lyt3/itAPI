module.exports = (sequelize, DataTypes) => {
    const Place = sequelize.define('Place', {
        placeid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
        },
        closestStation: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
        },
        longtitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
            primaryKey: false
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
            primaryKey: false
        },
        radius: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false,
            defaultValue: 500
        },
    })

    Place.associate = (models) => {
        Place.belongsTo(models.itinerary, {
            foreignKey: 'itineraryid',
            onDelete: 'CASCADE'
        })
    }

    return Place;

}