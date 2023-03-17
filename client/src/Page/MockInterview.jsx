import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import { useState } from "react";

import WhiteboardPopup from "./WhiteboardPopup";
import '../Styles/MockInterview.css'

const MockInterview = () => {


  const [buttonPopup, setButtonPopup] = useState(false);

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


      <div className="whiteboard">
         <button
            type="button"
            className="whiteboard-btn"
            id="toggle"
            onClick={() => setButtonPopup(true)}
          >
            Whiteboard Popup
            </button>

            <WhiteboardPopup trigger ={buttonPopup} setTrigger = {setButtonPopup}>
            </WhiteboardPopup>
      </div>
    </div>
  );
};

export default MockInterview;
