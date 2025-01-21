import { Container } from "@/components/custom/container";
import Timestamp from "@/components/custom/timestamp";
import { Blog } from "@/db/models/blog";
import { User } from "@/db/models/user";
import React from "react";

type Props = {
  params: Promise<{ blogId: string }>;
};

export default async function BlogDetailsPage({ params }: Props) {
  const { blogId } = await params;
  const blog = await Blog.findByPk(blogId, { include: User });

  return (
    <Container className="mt-8">
      <div className="px-8 py-4 border rounded-md shadow">
        <div className="mb-4 border-b pb-4">
          <div className="flex flex-row justify-between items-center">
            <p className="text-xl font-medium">{blog?.title}</p>
            <p className="text-sm font-semibold">
              written by {blog?.User?.firstName} {blog?.User?.lastName}
            </p>
          </div>
          <Timestamp date={new Date(blog?.createdAt || "")} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: blog?.content || "" }} />
      </div>
    </Container>
  );
}