import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import "../Styles/MockInterview.css";

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
    automaticLayout: true,
    fontFamily: "Fira Code",
    fontSize: 16,
    minimap: {
      enabled: true,
    },
    renderLineHighlight: "all",
    scrollBeyondLastLine: false,
    wordWrap: "on",
  };

  return (
    <div className="codeEditorContainer">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue="// type your code..."
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
        fontFamily={"Fira Code"}
        fontSize={16}
        value={`//type your code`}
      />
    </div>
  );
};

export default MockInterview;
