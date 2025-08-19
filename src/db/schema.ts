import { sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
} from "drizzle-orm/pg-core";

const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  specialties: jsonb("payload").default([]).notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

const specialties = pgTable("specialties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});
const advocate_specialties = pgTable("advocate_specialties", {
  advocate_specialty_id: serial("id").primaryKey(),
  advocate_id: integer("advocate_id")
    .notNull()
    .references(() => advocates.id),
  specialty_id: integer("specialty_id")
    .notNull()
    .references(() => specialties.id),
});

export { advocates, specialties, advocate_specialties };
