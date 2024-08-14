import 'dotenv/config';
import { envs } from './config/plugins/envs.plugins';
import { LogModel, MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
    user: envs.MONGO_USER,
    pass: envs.MONGO_PASS,
  });

  // Crear una colleción
  // colleción = tablas
  // documento = registros

  // const newLog = await LogModel.create({
  //   message: 'Test message desde Mongo',
  //   origin: 'App.ts',
  //   level: 'low',
  // });

  // await newLog.save();

  // console.log(newLog);

  // const logs = await LogModel.find();
  // console.log(logs);

  Server.start();
}
