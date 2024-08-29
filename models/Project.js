const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import your sequelize instance

class Project extends Model { }

Project.init({
    week: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    team: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    plannedServiceProduction: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    actualServiceProduction: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    countryOffice: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    proposalTitle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    clientName: {
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
    modelName: 'Project',
    tableName: 'projects',
    timestamps: false,
});

module.exports = Project;
