"use server";

import { Blog } from "@/db/models/blog";
import { redirect } from "next/navigation";

type Params = {
  blogId: string;
  title: string;
  content: string;
};

export async function UpdateBlogAction({ blogId, title, content }: Params) {
  await Blog.update(
    { title, content },
    {
      where: {
        id: blogId,
      },
    }
  );
  redirect(`/blog/${blogId}`);
}