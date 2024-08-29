const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import your sequelize instance
class BDU extends Model { }

BDU.init({
    week: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    team: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    plannedTPSubmission: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    actualTPSubmission: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    eth: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    ken: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    som: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    uga: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    multi: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    ss: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    proposalTitle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    clientName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    countryOffice: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    submittedDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    winOrFail: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    technicalResult: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    totalResult: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    awardAnnouncementDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    projectWinner: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'BDU',
    tableName: 'bdus',
    timestamps: false,
});

module.exports = BDU;
