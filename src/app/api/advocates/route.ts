import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import type { NextApiRequest, NextApiResponse } from "next";

// Fixes:
// error handling
// typing
// db seed and setup
// POST/PATCH/DELETE route ?

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);

  const data = advocateData;

  return res.status(200).json({ data });
}
