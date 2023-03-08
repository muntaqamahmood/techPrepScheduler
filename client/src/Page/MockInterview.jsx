import React, { useRef } from "react";

import Editor from "@monaco-editor/react";

const MockInterview = () => {
  const editorRef = useRef(null);

  const editorDidMount = (editor, monaco) => {
    console.log("editorDidMount", editor);
    editor.focus();
  };

  const onChange = (newValue, e) => {
    console.log("onChange");
    console.log(newValue);
    console.log(e);
  };

  const options = {
    selectOnLineNumbers: true,
  };

  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// type your code..."
      options={options}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
}

export default MockInterview;
