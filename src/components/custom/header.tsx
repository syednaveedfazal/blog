import { LogoutAction } from "@/app/login/action";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function Header() {
  const token = await getSession();
  const userId = token?.userDetails?.id;
  const userName =
    `${token?.userDetails?.firstName} ${token?.userDetails?.lastName}`.trim();

  return (
    <header className="flex flex-row justify-between items-center py-4 px-6 bg-gradient-to-r from-indigo-200 to-emerald-200">
      <div className="flex flex-row gap-4 items-center justify-start">
        <Link href={"/"} className="inline-block font-semibold text-2xl">
          Blogger
        </Link>
        <Link href={"/blog/new"}>Write Blog</Link>
      </div>
      <div>
        {userId ? (
          <div className="flex items-center justify-start">
            <span className=" font-semibold">Welcome {userName}</span>
            <Button variant="link" asChild>
              <Link href={`/author/${userId}`}>My Blogs</Link>
            </Button>
            <form action={LogoutAction}>
              <Button type="submit">Logout</Button>
            </form>
          </div>
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}