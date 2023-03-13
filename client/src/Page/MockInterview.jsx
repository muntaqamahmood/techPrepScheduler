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
    automaticLayout: true, // added automatic layout
    fontFamily: "Fira Code", // added font family
    fontSize: 16, // added font size
    minimap: {
      enabled: true, // added minimap
    },
    renderLineHighlight: "all", // added line highlighting
    scrollBeyondLastLine: false, // added scroll behavior
    wordWrap: "on", // added word wrapping
  };

  return (
    <div className="codeEditor">
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// type your code..."
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
        fontFamily={"Fira Code"} // added font family
        fontSize={16} // added font size
        value={`//type your code`} // added default value
      />
    </div>
  );
};

export default MockInterview;
