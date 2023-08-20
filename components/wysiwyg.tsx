"use client";
import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Wysiwyg = () => {
  const editorRef = useRef<any>(null);
  const [submittedText, setSubmittedText] = useState<string>("");

  const handleEditorInit = (evt: any, editor: any) => {
    editorRef.current = editor;

    const handleCustomButtonClick = () => {
      editorRef.current.execCommand(
        "mceInsertContent",
        false,
        "Custom button clicked!"
      );
    };

    const handleCustomMenuItemClick = () => {
      editorRef.current.execCommand(
        "mceInsertContent",
        false,
        "Menu item clicked!"
      );
    };

    editorRef.current.ui.registry.addButton("custom-button", {
      text: "Custom Button",
      onAction: handleCustomButtonClick,
    });

    editorRef.current.ui.registry.addMenuItem("custom-menu-item", {
      text: "Custom Menu Item",
      onAction: handleCustomMenuItemClick,
    });
  };

  const handleSubmit = () => {
    const text = editorRef.current.getContent();
    setSubmittedText(text);
  };

  return (
    <div>
      <Editor
        onInit={handleEditorInit}
        apiKey="rkhc3vrewrubakia2w6rucqx4eg50zme8rnp6ob9nilsv63f" // TinyMCE API key
        initialValue=""
        init={{
          height: 400,
          menubar: true,
          plugins: [ 'advlist', 'lists', 'link', 'image', 'charmap', 'print', 'preview', 'anchor',
                'searchplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'paste', 'code', 'help', 'wordcount',
                'imagetools', 'codesample', 'emoticons', 'hr' ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor backcolor | fontsize | fontfamily | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | removeformat | custom-button custom-menu-item | codesample emoticons | lineheight",
        }}
      />
      <button
        className="text-black bg-transparent border border-gray-300 hover:bg-gray-100 font-semibold hover:font-bold rounded-full text-sm px-5 py-2.5 text-center ml-5 mr-5 mt-5"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {submittedText && (
        <div className="border rounded-md p-4 mt-5 m-5 shadow-md">
          <p>{submittedText}</p>
        </div>
      )}
      {/* {submittedText && (
        <div className="border rounded-md p-4 mt-5 m-5 shadow-md">
          <div dangerouslySetInnerHTML={{ __html: submittedText }} />
        </div>
      )} */}
    </div>
  );
};

export default Wysiwyg;
