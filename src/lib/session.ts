import { cookies } from "next/headers";
import { decrypt } from "./encryption";
import { NextRequest, NextResponse } from "next/server";

export async function getSession(request?: NextRequest) {
  let token;
  if (request) {
    token = request.cookies.get("session")?.value;
  } else {
    const cookieStore = await cookies();
    token = cookieStore.get("session")?.value;
  }
  if (!token) return null;
  return await decrypt(token);
}

export async function updateSession(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) return;

  const res = NextResponse.next();
  const cookieExpireTime = 10 * 60 * 1000; // 10 minutes
  res.cookies.set({
    name: "session",
    value: token,
    expires: new Date(Date.now() + cookieExpireTime),
    httpOnly: true,
    secure: true,
  });
  return res;
}