'use strict';

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
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
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium',
      values: ['low', 'medium', 'high']  // Add this line
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
      defaultValue: 'pending',
      values: ['pending', 'in_progress', 'completed']  // Add this line
    },
    todoListId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'TodoLists',
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
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  Todo.associate = function(models) {
    Todo.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'creator'
    });
    Todo.belongsTo(models.TodoList, {
      foreignKey: 'todoListId',
      as: 'todoList'
    });
  };

  return Todo;
};