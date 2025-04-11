const express = require('express')
const authController = require('../controllers/auth-controller');
const validate = require('../middlewares/validate.middleware');
const { signUpSchema, loginSchema } = require('../validators/auth-validator');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/signup',validate(signUpSchema), authController.signUp)
router.post('/login',validate(loginSchema), authController.login)
router.get('/getProfile',authMiddleware, authController.getProfile)
router.get('/:id', authController.getUserFromId)

module.exports = router;