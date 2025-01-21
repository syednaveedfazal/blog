import { Container } from "@/components/custom/container";
import Timestamp from "@/components/custom/timestamp";
import { Blog } from "@/db/models/blog";
import { User } from "@/db/models/user";
import Link from "next/link";

export default async function Home() {
  const blogs = await Blog.findAll({
    include: User,
    order: [["createdAt", "DESC"]],
  });
  return (
    <Container className="flex flex-col gap-4 mt-8">
      {blogs.map((b) => (
        <Link
          key={b.id}
          href={`/blog/${b.id}`}
          className="px-8 py-4 border rounded-md shadow"
        >
          <div className="flex flex-row justify-between items-center">
            <p className="text-xl font-medium">{b.title}</p>
            <p className="text-sm font-semibold">
              written by {b?.User?.firstName} {b?.User?.lastName}
            </p>
          </div>
          <Timestamp date={new Date(b?.createdAt || "")} />
        </Link>
      ))}
    </Container>
  );
}