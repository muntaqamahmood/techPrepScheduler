import React, { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import WhiteboardPopup from "./WhiteboardPopup";
import "../Styles/MockInterview.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import logo from "../media/tpslogo.png";
import { useNavigate } from "react-router-dom";


import {
  ChakraProvider,
  Text,
  Container,
  Box,
  Image,
  Flex,
  Link,
  Button,
  ButtonGroup,
  List,
  ListItem,
  Grid,
} from "@chakra-ui/react";

import theme from "./Theme.js";

import { ColorModeScript } from "@chakra-ui/react";
import ToggleColorMode from "../Components/ToggleColorMode";


const MockInterview = () => {

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

  return (
  
   
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />

    <Container as="section" maxWidth="4x1" py="20px">
      <Flex alignItems="center" justifyContent="space-between">
        <Box mr="20px">
          <Image objectFit="cover" boxSize="100px" src={logo} />
        </Box>

        <Box>
          <ButtonGroup variant="ghost" spacing="4">
          
            <ToggleColorMode />
          </ButtonGroup>
        </Box>
      </Flex>

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
    </div>
    </Container>
    </ChakraProvider>
   
  );
};

export default MockInterview;
