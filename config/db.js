const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('performanceDashboard', 'air-m2', 'root', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres', // or the database dialect you're using 
});

module.exports = sequelize;    