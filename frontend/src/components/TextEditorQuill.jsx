import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles

const TextEditorQuill = ({ value, onChange }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = new Quill(quillRef.current, {
        theme: "snow", // Specify theme
        modules: {
          toolbar: true, // Add toolbar module
          // Include other modules here
        },
      });

      quill.on("text-change", () => {
        if (onChange) {
          onChange(quill.root.innerHTML);
        }
      });

      if (value) {
        quill.root.innerHTML = value;
      }
    }
  }, [value, onChange]);

  return <div ref={quillRef} />;
};

export default TextEditorQuill;
