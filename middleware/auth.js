const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {

    try {

        // Get token from headers
        const token = req.headers.authorization

        // Check token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            })
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Store user data
        req.user = decoded

        next()

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Invalid Token"
        })
    }
}

module.exports = authMiddleware