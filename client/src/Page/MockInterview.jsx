import React, { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import "../Styles/MockInterview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const MockInterview = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("python3");
  const [loading, setLoading] = useState(false);

  const onChange = (newValue, e) => {
    setCode(newValue);
  };

  const compileCode = async () => {
    setLoading(true);
    try {
      console.log("Compiling code");
      console.log(language, code);
      const response = await axios.post("http://localhost:5001/api/compiles/", {
        language,
        script: code,
      });
      console.log("response from backend", response.data.output);
      setOutput(response.data.output);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        defaultLanguage="python3"
        defaultValue=""
        options={options}
        onChange={onChange}
        fontFamily={"Fira Code"}
        fontSize={16}
        value={code}
      />
      <div className="buttonContainer">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="java">Java</option>
          <option value="python3">Python</option>
          <option value="c">C</option>
        </select>
        <button className="compileButton" onClick={compileCode}>
          Compile
        </button>
      </div>
      <div className="outputContainer">
        {loading && (
          <div className="loadingContainer">
            <FontAwesomeIcon icon={faSpinner} size="4x" spin />
          </div>
        )}
        {!loading && <div>{output}</div>}
      </div>
    </div>
  );
};

export default MockInterview;
