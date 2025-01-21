"use client";

import { Container } from "@/components/custom/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CreateBlogAction } from "./action";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("@/components/custom/editor").then((x) => x.Editor),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function Blog() {
  const [title, setTitle] = useState("");
  const [editorData, setEditorData] = useState("");

  const handlePublish = () => {
    CreateBlogAction({ title, content: editorData });
  };

  return (
    <Container>
      <h1 className="mb-8">From Thoughts to Words: Blog Without Limits</h1>
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
    </Container>
  );
}