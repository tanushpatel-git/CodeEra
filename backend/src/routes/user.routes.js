const express = require('express');
const router = express.Router();
const {userCreate,userLogout, userLogin,getUser} = require('../controllers/user.controller');
const userValidator = require('../validators/userSchema.Validator');
const userLoginValidator = require('../validators/userLogin.validator');

/**
 * @swagger
 * /user/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
router.post('/registration' ,userValidator , userCreate)

/**
 * @swagger
 * /user/logout:
 *   get:
 *     summary: Logout user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.get('/logout' ,userLogout)

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login',userLoginValidator ,userLogin)

/**
 * @swagger
 * /user/getUser:
 *   get:
 *     summary: Get current user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User data
 *       401:
 *         description: Unauthorized
 */
router.get('/getUser' ,getUser)

module.exports = router;