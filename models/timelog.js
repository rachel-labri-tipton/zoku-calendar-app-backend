'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TimeLog extends Model {
    static associate(models) {
      TimeLog.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      TimeLog.belongsTo(models.Todo, {
        foreignKey: 'todoId',
        as: 'todo'
      });
      TimeLog.belongsTo(models.TodoList, {
        foreignKey: 'todoListId',
        as: 'todoList'
      });
      TimeLog.belongsTo(models.Event, {
        foreignKey: 'eventId',
        as: 'event'
      });
      TimeLog.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
    }
  }

  TimeLog.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    todoId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Todos',
        key: 'id'
      }
    },
    todoListId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'TodoLists',
        key: 'id'
      }
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Events',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id'
      }
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
    modelName: 'TimeLog'
  });

  return TimeLog;
};