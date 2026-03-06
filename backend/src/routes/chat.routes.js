const express = require('express');
const router = express.Router();
const {getStreamToken} = require("../controllers/getStreamToken.controller");
const auth = require("../middleware/jsonWebTokenCheck.middleware")

/**
 * @swagger
 * /chat/token:
 *   get:
 *     summary: Get Stream chat token
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stream token retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/token" , auth, getStreamToken)


module.exports = router;