const jwt = require('jsonwebtoken')

// Authorization: Bearer <token>
const verifyToken = async (req, res, next) => {
   const authHeader = req.headers['authorization']
   const token = authHeader && authHeader.split(' ')[1]

   if (!token) {
      return res
         .status(403)
         .json({ success: false, message: 'No token provided!' })
   }
   try {
      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

      req.userId = decoded.user
      next()
   } catch (err) {
      console.log(err)
      return res.status(401).json({ success: false, message: 'Unauthorized!' })
   }
}

module.exports = { verifyToken }
