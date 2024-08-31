import { log } from "console";
import { envs } from "./envs.plugins";
import { throws } from "assert";

describe("envs.plugin.ts", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "joyan.dev.c@gmail.com",
      MAILER_SECRET_KEY: "nkytrxyzgvihtiqk",
      PROD: false,
      MONGO_URL: "mongodb://josue@localhost:27018",
      MONGO_USER: "josue",
      MONGO_PASS: "123456789",
      MONGO_DB_NAME: "NOC-TEST",
      POSTGRES_URL: "postgresql://josue:public@localhost:5432/NOC",
      POSTGRES_USER: "josue",
      POSTGRES_DB: "NOC-TEST",
      POSTGRES_PASSWORD: "123456789",
    });
  });
  test("should return error if not found PORT env", async () => {
    jest.resetModules();
    process.env.PORT = "";

    try {
      await import("./envs.plugins");
      expect(true).toBeFalsy();
    } catch (error) {
      expect(`${error}`).toContain(
        '"PORT" is a required variable, but its value was empty',
      );
    }
  });
});
