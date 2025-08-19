import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// declare global db to maintain connection across hot reloads
declare global {
  var db: ReturnType<typeof drizzle> | undefined;
}

const setup = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  try {
    if (!global.db) {
      const queryClient = postgres(process.env.DATABASE_URL, {
        // is this shooting myself in the foot ?
        max: 1,
        idle_timeout: 20,
        connect_timeout: 10,
        prepare: false,
      });

      global.db = drizzle(queryClient);
    }

    return global.db;
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw error;
  }
};

// Create db singleton
const db = setup();

export default db;
