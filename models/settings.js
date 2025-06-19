'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Settings extends Model {
    static associate(models) {
      Settings.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  Settings.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    theme: {
      type: DataTypes.STRING,
      defaultValue: 'light'
    },
    notifications: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: 'en'
    },
    timezone: {
      type: DataTypes.STRING,
      defaultValue: 'UTC'
    },
    startOfWeek: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // 0 = Sunday, 1 = Monday
      validate: {
        min: 0,
        max: 6
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Settings',
  });

  return Settings;
}