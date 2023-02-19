import { MongoClient } from 'mongodb';
import { env } from './environment';

const uri = env.MONGO_URI;

export const connectDB = async () => {
   const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   });
   try {
      // Connect the client to the server
      await client.connect();
      console.log('Connected to database');

      await listDatabases(client);

   } catch (err) {
      console.log(err);
      process.exit(1);
   }
};

const listDatabases = async client => {
   const databasesList = await client.db().admin().listDatabases();
   console.log('Databases:');
   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
