const WHITELIST_DOMAINS = ['http://localhost:3000', 'https://wfmg.vercel.app']

const corsOptions = {
   origin: WHITELIST_DOMAINS,
   credentials: true,
}
module.exports = corsOptions
