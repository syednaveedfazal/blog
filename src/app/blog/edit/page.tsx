import { Container } from "@/components/custom/container";
import { Blog } from "@/db/models/blog";
import BlogEdit from "./blog-edit";

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function BlogEditPage({ searchParams }: Props) {
  const query = await searchParams;
  const blogId = query?.blogId;
  const blog = await Blog.findByPk(blogId);

  return (
    <Container>
      <h1 className="mb-8">From Thoughts to Words: Blog Without Limits</h1>
      <BlogEdit
        blogId={blogId}
        blogTitle={blog?.title || ""}
        blogContent={blog?.content || ""}
      />
    </Container>
  );
}