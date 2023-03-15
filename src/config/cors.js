const WHITELIST_DOMAINS = ['http://localhost:3000', 'http://localhost:3001'];

export const corsOptions = {
   origin: function (origin, callback) {
      if (WHITELIST_DOMAINS.indexOf(origin) !== -1 || !origin) {
         callback(null, true);
      } else {
         callback(new Error($`${origin} Not allowed by CORS`));
      }
   },
   credentials: true,
   optionsSuccessStatus: 200,
   allowedHeaders: [
      'Authorization',
      'Content-Type',
      'Access-Control-Request-Method',
      'X-Requested-With',
      'Accept',
      'Access-Control-Request-Headers',
      'Origin',
      'Access-Control-Allow-Headers',
   ],
   methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
   exposedHeaders: ['Access-Control-Allow-Origin'],
   preflightContinue: true,
};
