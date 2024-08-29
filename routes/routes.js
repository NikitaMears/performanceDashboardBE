const express = require('express');
const userController = require('../controllers/userController');
const roleController = require('../controllers/roleController');
const permissionController = require('../controllers/permissionController');
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

module.exports = router;