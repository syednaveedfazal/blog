import { SignJWT, jwtVerify } from "jose";

type tokenPayload = {
  userDetails: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
  };
};

const secret = "let_token = null; // noOneWillGuessThisOne!;)";
const key = new TextEncoder().encode(secret);
const alg = "HS256";

export async function encrypt(payload: tokenPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(key);
}

export async function decrypt(input: string) {
  try {
    const { payload } = await jwtVerify<tokenPayload>(input, key, {
      algorithms: [alg],
    });
    return payload;
  } catch (e) {
    console.error(e);
  }
}