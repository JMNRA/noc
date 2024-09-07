import { MongoDatabase } from "./init";
import mongoose from "mongoose";

describe("init MongoDB", () => {
  beforeEach(() => {
    // Limpiar todas las conexiones antes de cada prueba
    mongoose.connections.forEach((conn) => conn.close());
    mongoose.disconnect();
  });
  afterAll(async () => {
    // Asegurarse de que todas las conexiones estén cerradas después de todas las pruebas
    await mongoose.disconnect();
  });
  test("should connect to MongoDB", async () => {
    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
      user: process.env.MONGO_USER!,
      pass: process.env.MONGO_PASS!,
    });
    expect(connected).toBeTruthy();
  });
  test("should throw an error", async () => {
    try {
      const connected = await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: process.env.MONGO_URL!,
        user: "invalid_user",
        pass: "invalid_pass",
      });
    } catch (error) {
      expect(`${error}`).toContain("MongoServerError: Authentication failed");
    }
  });
});
