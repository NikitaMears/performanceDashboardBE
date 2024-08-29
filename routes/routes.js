const express = require('express');
const userController = require('../controllers/userController');
const roleController = require('../controllers/roleController');
const permissionController = require('../controllers/permissionController');
const projectController = require('../controllers/projectController');
const financeController = require('../controllers/financeController');
const bduController = require('../controllers/bduController');

const { verifyToken } = require('../middlewares/verifyToken');



const router = express.Router();

// User routes
router.post('/users', verifyToken, userController.createUser);
router.get('/users', verifyToken, userController.getUsers);
router.post('/users/change-password/:id',verifyToken, userController.changePassword);

router.put('/users/:id', verifyToken, userController.updateUser);
router.delete('/users/:id', verifyToken, userController.deleteUser);
router.post('/login', userController.login);
router.get('/user/:id', verifyToken, userController.getUserById); // Use the middleware to verify the token

// Role routes
router.get('/roles', verifyToken, roleController.getRoles);
router.post('/roles', verifyToken, roleController.createRole);
router.put('/roles/:id', verifyToken, roleController.updateRole);
router.delete('/roles/:id', verifyToken, roleController.deleteRole);

// Permission routes
router.get('/permissions', verifyToken, permissionController.getPermissions);
router.post('/permissions', verifyToken, permissionController.createPermission);
router.put('/permissions/:id', verifyToken, permissionController.updatePermission);
router.delete('/permissions/:id', verifyToken, permissionController.deletePermission);


//Latest changes

router.post('/signup', userController.signup);
router.get('/dashboard',verifyToken, userController.dashboard);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);


router.post('/projects', projectController.createProject);
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getProjectById);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

// Dashboard routes
router.get('/dashboard/actual-service-production-by-team', projectController.getActualServiceProductionByTeam);
router.get('/dashboard/actual-service-production-by-country-office', projectController.getActualServiceProductionByCountryOffice);
router.get('/dashboard/actual-vs-planned-service-production-by-team', projectController.getActualVsPlannedServiceProductionByTeam);
router.get('/dashboard/total-service-production', projectController.getTotalServiceProduction);




router.post('/finances', financeController.createFinanceEntry);
router.get('/finances', financeController.getAllFinanceEntries);
router.get('/finances/:id', financeController.getFinanceEntryById);
router.put('/finances/:id', financeController.updateFinanceEntry);
router.delete('/finances/:id', financeController.deleteFinanceEntry);

// Dashboard routes
router.get('/dashboard/actual-cash-collection-by-team', financeController.getActualCashCollectionByTeam);
router.get('/dashboard/actual-cash-collection-by-country-office', financeController.getActualCashCollectionByCountryOffice);
router.get('/dashboard/actual-vs-planned-cash-collection-by-team', financeController.getActualVsPlannedCashCollectionByTeam);
router.get('/dashboard/total-cash-collection', financeController.getTotalCashCollection);


router.post('/bdus', bduController.createBDUEntry);
router.get('/bdus', bduController.getAllBDUEntries);
router.get('/bdus/:id', bduController.getBDUEntryById);
router.put('/bdus/:id', bduController.updateBDUEntry);
router.delete('/bdus/:id', bduController.deleteBDUEntry);

// Dashboard routes
router.get('/dashboard/actual-tp-submission-by-team', bduController.getActualTPSubmissionByTeam);
router.get('/dashboard/actual-tp-submission-by-country-office', bduController.getActualTPSubmissionByCountryOffice);
router.get('/dashboard/actual-vs-planned-tp-submission-by-team', bduController.getActualVsPlannedTPSubmissionByTeam);
router.get('/dashboard/total-tp-submission', bduController.getTotalTPSubmission);


module.exports = router;