"use server";

import { Blog } from "@/db/models/blog";
import { redirect } from "next/navigation";

export async function DeleteBlogAction(formData: FormData) {
  const blogId = formData.get("blogId")?.toString();
  const authorId = formData.get("authorId")?.toString();
  await Blog.destroy({ where: { id: blogId } });
  redirect(`/author/${authorId}`);
}