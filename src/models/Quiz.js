module.exports = (sequelize, DataTypes) => {
    const Quiz = sequelize.define('Quiz', {
        quizversion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },   
    })

    Quiz.associate = (models) => {
        Quiz.hasMany(models.question, {
            foreignKey: 'quizversion',
            as: 'questions',
        });
    }

    return Quiz;
}