const express = require('express');
const auth = require("../middleware/jsonWebTokenCheck.middleware");
const router = express.Router();

/**
 * @swagger
 * /access/videoCalling:
 *   get:
 *     summary: Video Calling endpoint
 *     tags: [Video Calling]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Video Calling endpoint working
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/videoCalling',auth,(req, res) => {
    try{
        res.json({
            success: true,
            message: 'Video Calling',
        })
    }catch(err){
        res.json({
            success: false,
            message:'Internal Server Error',
        })
    }
})

module.exports = router;