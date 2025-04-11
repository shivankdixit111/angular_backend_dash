const express = require('express')
const adminController = require('../controllers/admin-controller');
const authMiddleware = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

const router = express.Router();

router.get('/getAllUsers',authMiddleware, isAdmin,  adminController.getAllUsers)
router.post('/updateUser/:id',authMiddleware, isAdmin, adminController.updateUser)
router.get('/deleteUser/:id',authMiddleware, isAdmin, adminController.deleteUser)


module.exports = router;