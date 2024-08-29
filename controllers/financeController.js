const { Sequelize } = require('sequelize');
const sequelize = require('../config/db'); // Ensure this path is correct
const Finance = require('../models/Finance'); // Import your Finance model

// Create a new finance entry
exports.createFinanceEntry = async (req, res) => {
    try {
        const newFinanceEntry = await Finance.create(req.body);
        res.status(201).json(newFinanceEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all finance entries
exports.getAllFinanceEntries = async (req, res) => {
    try {
        const financeEntries = await Finance.findAll();
        res.status(200).json(financeEntries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a finance entry by ID
exports.getFinanceEntryById = async (req, res) => {
    try {
        const financeEntry = await Finance.findByPk(req.params.id);
        if (financeEntry) {
            res.status(200).json(financeEntry);
        } else {
            res.status(404).json({ message: 'Finance entry not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a finance entry by ID
exports.updateFinanceEntry = async (req, res) => {
    try {
        const [updated] = await Finance.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedFinanceEntry = await Finance.findByPk(req.params.id);
            res.status(200).json(updatedFinanceEntry);
        } else {
            res.status(404).json({ message: 'Finance entry not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a finance entry by ID
exports.deleteFinanceEntry = async (req, res) => {
    try {
        const deleted = await Finance.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Finance entry deleted' });
        } else {
            res.status(404).json({ message: 'Finance entry not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Dashboard Data: Get actual cash collection by team for each distinct week
exports.getActualCashCollectionByTeam = async (req, res) => {
    try {
        // Get all distinct weeks from the Finance table
        const weeks = await Finance.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('week')), 'week']],
            order: [['week', 'ASC']]
        });

        const results = [];
        for (const week of weeks) {
            const weekData = await Finance.findAll({
                attributes: ['team', 'week', [sequelize.fn('SUM', sequelize.col('actualCashCollection')), 'totalActualCashCollection']],
                where: { week: week.getDataValue('week') },
                group: ['team', 'week']
            });
            results.push({ week: week.getDataValue('week'), data: weekData });
        }

        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Dashboard Data: Get actual cash collection by country office for each distinct week
exports.getActualCashCollectionByCountryOffice = async (req, res) => {
    try {
        // Get all distinct weeks from the Finance table
        const weeks = await Finance.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('week')), 'week']],
            order: [['week', 'ASC']]
        });

        const results = [];
        for (const week of weeks) {
            const weekData = await Finance.findAll({
                attributes: ['countryOffice', 'week', [sequelize.fn('SUM', sequelize.col('actualCashCollection')), 'totalActualCashCollection']],
                where: { week: week.getDataValue('week') },
                group: ['countryOffice', 'week']
            });
            results.push({ week: week.getDataValue('week'), data: weekData });
        }

        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Dashboard Data: Get actual vs planned cash collection by team for each distinct week
exports.getActualVsPlannedCashCollectionByTeam = async (req, res) => {
    try {
        // Get all distinct weeks from the Finance table
        const weeks = await Finance.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('week')), 'week']],
            order: [['week', 'ASC']]
        });

        const results = [];
        for (const week of weeks) {
            const weekData = await Finance.findAll({
                attributes: [
                    'team', 
                    'week',
                    [sequelize.fn('SUM', sequelize.col('plannedCashCollection')), 'totalPlannedCashCollection'], 
                    [sequelize.fn('SUM', sequelize.col('actualCashCollection')), 'totalActualCashCollection']
                ],
                where: { week: week.getDataValue('week') },
                group: ['team', 'week']
            });
            results.push({ week: week.getDataValue('week'), data: weekData });
        }

        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Dashboard Data: Get total planned and actual cash collection for each distinct week
exports.getTotalCashCollection = async (req, res) => {
    try {
        // Get all distinct weeks from the Finance table
        const weeks = await Finance.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('week')), 'week']],
            order: [['week', 'ASC']]
        });

        const results = [];
        for (const week of weeks) {
            const weekData = await Finance.findAll({
                attributes: [
                    'week',
                    [sequelize.fn('SUM', sequelize.col('plannedCashCollection')), 'totalPlannedCashCollection'],
                    [sequelize.fn('SUM', sequelize.col('actualCashCollection')), 'totalActualCashCollection']
                ],
                where: { week: week.getDataValue('week') },
                group: ['week']
            });
            results.push({ week: week.getDataValue('week'), data: weekData });
        }

        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
