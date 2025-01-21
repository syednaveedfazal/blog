"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { useState } from "react";
import { UpdateBlogAction } from "./action";

const Editor = dynamic(
  () => import("@/components/custom/editor").then((x) => x.Editor),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

type Props = {
  blogId: string;
  blogTitle: string;
  blogContent: string;
};

export default function BlogEdit({
  blogId,
  blogTitle = "",
  blogContent = "",
}: Props) {
  const [title, setTitle] = useState(blogTitle);
  const [editorData, setEditorData] = useState(blogContent);

  const handlePublish = () => {
    UpdateBlogAction({
      blogId,
      title,
      content: editorData,
    });
  };

  return (
    <>
      <Label htmlFor="title" className="inline-block mb-2">
        Title
      </Label>
      <Input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="my-4">
        <Editor data={editorData} onChange={(data) => setEditorData(data)} />
      </div>
      <Button onClick={handlePublish} disabled={!title || !editorData}>
        Publish
      </Button>
    </>
  );
}