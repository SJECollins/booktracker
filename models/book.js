const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

module.exports = (sequelize) => {
  class Book extends Model {}

  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
          max: 5,
        },
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isOwned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      authorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "authors",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Book",
      tableName: "books",
    }
  );

  Book.associate = function (models) {
    Book.belongsTo(models.Author, {
      foreignKey: "authorId",
      as: "author",
    });
  };

  return Book;
};
