const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import your sequelize instance

class Finance extends Model { }

Finance.init({
    week: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    team: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    plannedCashCollection: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    actualCashCollection: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    plannedPayrollToRevenueRatio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    actualPayrollToRevenueRatio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    countryOffice: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalActualCashCollection: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    totalPlannedCashCollection: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Finance',
    tableName: 'finances',
    timestamps: false,
});

module.exports = Finance;
