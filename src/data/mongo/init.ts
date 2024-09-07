import mongoose from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
  user?: string;
  pass?: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    const { mongoUrl, dbName, user, pass } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName: dbName,
        user: user,
        pass: pass,
      });

      return true;
    } catch (error) {
      throw error;
    }
  }
}
