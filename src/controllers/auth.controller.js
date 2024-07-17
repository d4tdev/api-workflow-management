const AuthService = require('../services/auth.service')
const { HttpStatusCode } = require('../utilities/constants')

module.exports = new (class AuthController {
   login = async (req, res) => {
      try {
         const result = await AuthService.login(req.body)

         res.status(HttpStatusCode.CREATED).json(result)
      } catch (err) {
         console.log(err)
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json('Error' + err)
      }
   }

   register = async (req, res) => {
      try {
         const result = await AuthService.register(req.body)

         res.status(HttpStatusCode.CREATED).json(result)
      } catch (err) {
         console.log(err)
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(err)
      }
   }

   getUserInfo = async (req, res) => {
      try {
         const result = await AuthService.getUserInfo(req.userId)

         res.status(HttpStatusCode.OK).json(result)
      } catch (err) {
         console.log(err)
         res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            errors: err.message,
         })
      }
   }
})()
