import React, { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import WhiteboardPopup from "./WhiteboardPopup";
import "../Styles/MockInterview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import Peer from "peerjs";

const MockInterview = () => {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  const [buttonPopup, setButtonPopup] = useState(false);
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
        language: language === "python" ? "python3" : language,
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

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("call", (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream);
        call.on("stream", function (remoteStream) {
          // Show stream in some video/canvas element.
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
    });

    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on("stream", (remoteStream) => {
        // Show stream in some video/canvas element.
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  };

  return (
    <div className="codeEditorContainer">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        language={language}
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
          <option value="python">Python</option>
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

      <div className="whiteboard">
        <button
          type="button"
          className="whiteboard-btn"
          id="toggle"
          onClick={() => setButtonPopup(true)}
        >
          Whiteboard Popup
        </button>

        <WhiteboardPopup
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
        ></WhiteboardPopup>
      </div>
      <div className="webcamContainer">
        <h1 className="webcamText">Your peerId is {peerId}</h1>
        <input
          type="text"
          value={remotePeerIdValue}
          onChange={(e) => setRemotePeerIdValue(e.target.value)}
        />
        <button onClick={() => call(remotePeerIdValue)}>Webcam</button>
        <div>
          <video ref={currentUserVideoRef} />
        </div>
        <div>
          <video ref={remoteVideoRef} />
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
