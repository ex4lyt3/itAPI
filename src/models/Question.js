module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question',{
        questionid : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: false
        },
    })

    return Question;
}