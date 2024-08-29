const { Sequelize } = require('sequelize');
const sequelize = require('../config/db'); // Import your sequelize instance
const BDU = require('../models/BDU'); // Import your BDU model

// Create a new BDU entry
exports.createBDUEntry = async (req, res) => {
    try {
        const newBDUEntry = await BDU.create(req.body);
        res.status(201).json(newBDUEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all BDU entries
exports.getAllBDUEntries = async (req, res) => {
    try {
        const bduEntries = await BDU.findAll();
        res.status(200).json(bduEntries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a BDU entry by ID
exports.getBDUEntryById = async (req, res) => {
    try {
        const bduEntry = await BDU.findByPk(req.params.id);
        if (bduEntry) {
            res.status(200).json(bduEntry);
        } else {
            res.status(404).json({ message: 'BDU entry not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a BDU entry by ID
exports.updateBDUEntry = async (req, res) => {
    try {
        const [updated] = await BDU.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedBDUEntry = await BDU.findByPk(req.params.id);
            res.status(200).json(updatedBDUEntry);
        } else {
            res.status(404).json({ message: 'BDU entry not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a BDU entry by ID
exports.deleteBDUEntry = async (req, res) => {
    try {
        const deleted = await BDU.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'BDU entry deleted' });
        } else {
            res.status(404).json({ message: 'BDU entry not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Dashboard Data: Get actual TP submission by team for each distinct week
exports.getActualTPSubmissionByTeam = async (req, res) => {
    try {
        // Get all distinct weeks from the BDU table
        const weeks = await BDU.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('week')), 'week']],
            order: [['week', 'ASC']]
        });

        const results = [];
        for (const week of weeks) {
            const weekData = await BDU.findAll({
                attributes: ['team', 'week', [sequelize.fn('SUM', sequelize.col('actualTPSubmission')), 'totalActualTPSubmission']],
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

// Dashboard Data: Get actual TP submission by country office for each distinct week
exports.getActualTPSubmissionByCountryOffice = async (req, res) => {
    try {
        // Get all distinct weeks from the BDU table
        const weeks = await BDU.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('week')), 'week']],
            order: [['week', 'ASC']]
        });

        const results = [];
        for (const week of weeks) {
            const weekData = await BDU.findAll({
                attributes: ['countryOffice', 'week', [sequelize.fn('SUM', sequelize.col('actualTPSubmission')), 'totalActualTPSubmission']],
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

// Dashboard Data: Get actual vs planned TP submission by team for each distinct week
exports.getActualVsPlannedTPSubmissionByTeam = async (req, res) => {
    try {
        // Get all distinct weeks from the BDU table
        const weeks = await BDU.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('week')), 'week']],
            order: [['week', 'ASC']]
        });

        const results = [];
        for (const week of weeks) {
            const weekData = await BDU.findAll({
                attributes: [
                    'team', 
                    'week',
                    [sequelize.fn('SUM', sequelize.col('plannedTPSubmission')), 'totalPlannedTPSubmission'], 
                    [sequelize.fn('SUM', sequelize.col('actualTPSubmission')), 'totalActualTPSubmission']
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

// Dashboard Data: Get total TP submission for each distinct week
exports.getTotalTPSubmission = async (req, res) => {
    try {
        // Get all distinct weeks from the BDU table
        const weeks = await BDU.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('week')), 'week']],
            order: [['week', 'ASC']]
        });

        const results = [];
        for (const week of weeks) {
            const weekData = await BDU.findAll({
                attributes: [
                    'week',
                    [sequelize.fn('SUM', sequelize.col('plannedTPSubmission')), 'totalPlannedTPSubmission'],
                    [sequelize.fn('SUM', sequelize.col('actualTPSubmission')), 'totalActualTPSubmission']
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
