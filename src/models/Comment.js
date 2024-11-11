module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        commentid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false
        },
        itineraryid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })

    Comment.associate = (models) => {
        Comment.belongsTo(models.itinerary, {
            foreignKey: 'itineraryid',
            onDelete: 'CASCADE',
        }),
        Comment.belongsTo(models.user, {
            foreignKey: 'userid',
            onDelete: 'CASCADE'
        });
    }

    return Comment;
}