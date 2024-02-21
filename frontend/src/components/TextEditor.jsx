import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import "./text-editor.css"; // Your custom styles

export default function TextEditor() {
  const [text, setText] = useState("");

  const handleChange = (value) => {
    setText(value);
  };
  const toolbarOptions = [
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown

    ["bold", "italic", "underline", "strike"], // toggled buttons
    [{ color: [] }, { background: [] }], // dropdown with defaults
    ["blockquote", "code-block"],

    // [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    // [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    // [{ direction: "rtl" }], // text direction

    // [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ font: [] }],
    [{ align: [] }],
    ["link", "image"],

    ["clean"], // remove formatting
  ];

  return (
    <div>
      <ReactQuill
        value={text}
        onChange={handleChange}
        className="my-custom-quill" // Apply custom class
        modules={{ toolbar: toolbarOptions }}
      />
    </div>
  );
}
