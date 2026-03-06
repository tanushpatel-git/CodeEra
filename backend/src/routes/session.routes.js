const express = require('express');
const router = express.Router();
const auth = require("../middleware/jsonWebTokenCheck.middleware");
const {
    createSession, getActiveSession, getMyRecentSession, getSessionById, joinSession, endSession
} = require("../controllers/session.controller");

/**
 * @swagger
 * /session:
 *   post:
 *     summary: Create a new session
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Session created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/", auth, createSession)

/**
 * @swagger
 * /session/active:
 *   get:
 *     summary: Get active session
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active session data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/active", auth, getActiveSession)

/**
 * @swagger
 * /session/my-recent:
 *   get:
 *     summary: Get my recent sessions
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent sessions retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/my-recent", auth, getMyRecentSession)

/**
 * @swagger
 * /session/{id}:
 *   get:
 *     summary: Get session by ID
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Session data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", auth, getSessionById)

/**
 * @swagger
 * /session/{id}/join:
 *   post:
 *     summary: Join a session
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Joined session successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/:id/join", auth, joinSession)

/**
 * @swagger
 * /session/{id}/end:
 *   post:
 *     summary: End a session
 *     tags: [Session]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Session ended successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/:id/end", auth, endSession)


module.exports = router;