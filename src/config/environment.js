require('dotenv').config()

module.exports = {
   env: {
      PORT: process.env.PORT,
      MONGO_URI: process.env.MONGO_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
      HOSTNAME: process.env.HOSTNAME,
      DATABASE_NAME: process.env.DATABASE_NAME,
   },
}
