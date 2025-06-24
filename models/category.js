'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Category.hasMany(models.TimeLog, {
        foreignKey: 'categoryId',
        as: 'timeLogs'
      });
    }
  }

  Category.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    type: {
      type: DataTypes.ENUM('work', 'personal', 'health', 'study', 'custom'),
      defaultValue: 'custom',
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: '#808080',
      validate: {
        isHexColor(value) {
          if (value && !value.match(/^#[0-9A-Fa-f]{6}$/)) {
            throw new Error('Color must be a valid hex code (e.g., #FF0000)');
          }
        }
      }
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    goalHours: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    weeklyGoal: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    monthlyGoal: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 1000]
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Category',
    hooks: {
      beforeCreate: async (category) => {
        if (category.isDefault) {
          // Ensure name matches one of the default types if isDefault is true
          if (category.type === 'custom') {
            throw new Error('Default categories must have a predefined type');
          }
        }
      }
    }
  });

  return Category;
}