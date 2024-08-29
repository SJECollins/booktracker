"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Author extends Model {}
  Author.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Author",
      tableName: "authors",
    }
  );

  Author.associate = function (models) {
    Author.hasMany(models.Book, {
      foreignKey: "authorId",
      as: "books",
    });
  };

  return Author;
};
