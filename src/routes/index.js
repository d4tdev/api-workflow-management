const { apiV1 } = require('./v1')
const routes = (app) => {
   app.use('/v1', apiV1)
   app.use('/', (req, res) => res.json({ message: 'Welcome to the API' }))
}
module.exports = routes
