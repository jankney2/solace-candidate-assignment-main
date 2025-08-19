import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Best practice for Next.js - declare global variables to maintain connection across hot reloads
declare global {
  var db: ReturnType<typeof drizzle> | undefined;
}

const setup = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  try {
    if (!global.db) {
      // Configure postgres client for Next.js environment
      const queryClient = postgres(process.env.DATABASE_URL, {
        max: 1, // Reuse the same connection
        idle_timeout: 20, // Keep-alive timeout
        connect_timeout: 10, // Connection timeout
        prepare: false, // Disable prepared statements for better edge compatibility
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
