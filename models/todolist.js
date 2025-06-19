'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TodoList extends Model {
    static associate(models) {
      TodoList.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'creator'
      });
      TodoList.hasMany(models.Todo, {
        foreignKey: 'todoListId',
        as: 'todos'
      });
    }
  }

  TodoList.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: '#1976d2'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'TodoList',
  });

  return TodoList;
};