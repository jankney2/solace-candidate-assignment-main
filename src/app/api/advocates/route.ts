import db from "../../../db";
import { sql, eq } from "drizzle-orm";
import {
  advocates,
  advocate_specialties,
  specialties,
} from "../../../db/schema";
import { Advocate } from "@/types/Advocate";
// Fixes:
// error handling
// typing
// db seed and setup
// POST/PATCH/DELETE route ?

export async function GET() {
  try {
    const result: Advocate[] = await db
      .select({
        id: advocates.id,
        firstName: advocates.firstName,
        lastName: advocates.lastName,
        city: advocates.city,
        degree: advocates.degree,
        yearsOfExperience: advocates.yearsOfExperience,
        phoneNumber: advocates.phoneNumber,
        createdAt: advocates.createdAt,
        specialties: sql<any>`COALESCE(
          json_agg(
            json_build_object(
              'id', ${specialties.id},
              'name', ${specialties.name}
            )
          ) FILTER (WHERE ${specialties.id} IS NOT NULL),
          '[]'
        )::json`.as("specialties"),
      })
      .from(advocates)
      .leftJoin(
        advocate_specialties,
        eq(advocate_specialties.advocate_id, advocates.id)
      )
      .leftJoin(
        specialties,
        eq(specialties.id, advocate_specialties.specialty_id)
      )
      .groupBy(
        advocates.id,
        advocates.firstName,
        advocates.lastName,
        advocates.city,
        advocates.degree,
        advocates.yearsOfExperience,
        advocates.phoneNumber,
        advocates.createdAt
      );

    console.log(result, "faweoijfawefoiajw");
    return Response.json({ result });
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
}
