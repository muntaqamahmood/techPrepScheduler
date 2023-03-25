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
  Select,
  Center,
  Spinner,
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

        <Box w="55%" h="80vh" p={4}>
          <Editor
            height="calc(50% - 30px)"
            defaultLanguage="javascript"
            language={language}
            defaultValue=""
            options={options}
            onChange={onChange}
            fontFamily={"Fira Code"}
            fontSize={16}
            value={code}
          />
          <Box mt={4} display="flex" justifyContent="space-between">
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="c">C</option>
            </Select>
            <Button colorScheme="blue" onClick={compileCode}>
              Compile
            </Button>
          </Box>

          <Box
            mt={4}
            p={2}
            height="calc(30% - 20px)"
            overflowY="auto"
            border="1px solid #E2E8F0"
            borderRadius="md"
          >
            {loading && (
              <Center>
                <Spinner size="xl" />
              </Center>
            )}
            {!loading && <div>{output}</div>}
          </Box>

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button colorScheme="blue" onClick={() => setButtonPopup(true)}>
              Whiteboard Popup
            </Button>
          </Box>
          <WhiteboardPopup trigger={buttonPopup} setTrigger={setButtonPopup} />
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default MockInterview;
