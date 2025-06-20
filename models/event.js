'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    location: DataTypes.STRING,
    isAllDay: DataTypes.BOOLEAN,
    color: DataTypes.STRING,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};