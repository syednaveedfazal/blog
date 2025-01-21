"use server";

import { User } from "@/db/models/user";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";
import { registerSchema } from "./schema";

export async function RegisterAction(
  prevState: unknown,
  data: z.infer<typeof registerSchema>
) {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const { password, ...rest } = data;
    const passwordHash = await bcrypt.hash(password, salt);
    const user = { ...rest, password: passwordHash };
    await User.create({ ...user });
    redirect("/login");
  } catch (e) {
   
    throw e;
  }
}