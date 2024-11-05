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
        }
    })

    Comment.associate = (models) => {
        Comment.belongsTo(models.Itinerary, {
            foreignKey: 'itineraryid',
            onDelete: 'CASCADE'
        }),
        Comment.belongsTo(models.User, {
            foreignKey: 'userid',
            onDelete: 'CASCADE'
        });
    }

    return Comment;
}