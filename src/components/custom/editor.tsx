"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

type props = {
  data: string;
  onChange: (data: string) => void;
};

export const Editor = ({ data, onChange }: props) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{
        licenseKey: "GPL",
        placeholder: "Type your content here...",
      }}
    />
  );
};