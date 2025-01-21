"use server";

import { User } from "@/db/models/user";
import { encrypt } from "@/lib/encryption";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function LogoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}
export async function LoginAction(data: FormData) {
  try {
    const loginEmail = data.get("email")?.toString();
    const loginPassword = data.get("password")?.toString();
    if (!loginEmail || !loginPassword) {
      throw new Error("Missing credentials");
    }

    const user = await User.findOne({ where: { email: loginEmail } });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const match = await bcrypt.compare(loginPassword, user?.password);
    if (!match) {
      throw new Error("Invalid credentials");
    }

    const token = await encrypt({
      userDetails: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });

    const cookieStore = await cookies();
    const cookieExpireTime = 10 * 60 * 1000; // 10 minutes
    cookieStore.set("session", token, {
      expires: new Date(Date.now() + cookieExpireTime),
      httpOnly: true,
      secure: true,
    });
    redirect("/");
  } catch (e) {
    throw e;
  }
}
