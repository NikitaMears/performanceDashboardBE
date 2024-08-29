const Project = require('../models/Project'); // Adjust the path as necessary
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db'); // Adjust this path to match your configuration file


// Create a new project
exports.createProject = async (req, res) => {
    try {
        const newProject = await Project.create(req.body);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
    try {
        const [updated] = await Project.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedProject = await Project.findByPk(req.params.id);
            res.status(200).json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
    try {
        const deleted = await Project.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Project deleted' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Dashboard Data: Get actual service production by team
exports.getActualServiceProductionByTeam = async (req, res) => {
    try {
        // Get all distinct weeks from the Project table
        const weeks = await Project.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('week')), 'week']],
            order: [['week', 'ASC']]
        });

        const results = [];
        for (const week of weeks) {
            const weekData = await Project.findAll({
                attributes: ['team', 'week', [sequelize.fn('SUM', sequelize.col('actualServiceProduction')), 'totalActualServiceProduction']],
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


// Dashboard Data: Get actual service production by country office
exports.getActualServiceProductionByCountryOffice = async (req, res) => {
    try {
        // Get all distinct weeks from the Project table
        const weeks = await Project.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('week')), 'week']],
            order: [['week', 'ASC']]
        });

        const results = [];
        for (const week of weeks) {
            const weekData = await Project.findAll({
                attributes: ['countryOffice', 'week', [sequelize.fn('SUM', sequelize.col('actualServiceProduction')), 'totalActualServiceProduction']],
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


// Dashboard Data: Get actual vs planned service production by team
exports.getActualVsPlannedServiceProductionByTeam = async (req, res) => {
    try {
        // Get all distinct weeks from the Project table
        const weeks = await Project.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('week')), 'week']],
            order: [['week', 'ASC']]
        });

        const results = [];
        for (const week of weeks) {
            const weekData = await Project.findAll({
                attributes: [
                    'team', 
                    'week',
                    [sequelize.fn('SUM', sequelize.col('plannedServiceProduction')), 'totalPlannedServiceProduction'], 
                    [sequelize.fn('SUM', sequelize.col('actualServiceProduction')), 'totalActualServiceProduction']
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


// Dashboard Data: Get total planned and actual service production
exports.getTotalServiceProduction = async (req, res) => {
    try {
        // Get all distinct weeks from the Project table
        const weeks = await Project.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('week')), 'week']],
            order: [['week', 'ASC']]
        });

        const results = [];
        for (const week of weeks) {
            const weekData = await Project.findAll({
                attributes: [
                    'week',
                    [sequelize.fn('SUM', sequelize.col('plannedServiceProduction')), 'totalPlannedServiceProduction'],
                    [sequelize.fn('SUM', sequelize.col('actualServiceProduction')), 'totalActualServiceProduction']
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

