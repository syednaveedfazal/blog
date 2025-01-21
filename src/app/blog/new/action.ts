"use server";

import { Blog } from "@/db/models/blog";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

type Params = {
  title: string;
  content: string;
};

export async function CreateBlogAction(data: Params) {
  if (!data.title || !data.content) {
    throw new Error("Missing blog data.");
  }
  const token = await getSession();
  const userId = token?.userDetails?.id;
  await Blog.create({
    title: data.title,
    content: data.content,
    userId: userId!,
  });
  redirect("/");
}