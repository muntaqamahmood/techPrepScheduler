import React, { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import WhiteboardPopup from "./WhiteboardPopup";
import "../Styles/MockInterview.css";
import { useEffect, useRef } from "react";
import Peer from "peerjs";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useColorModeValue } from "@chakra-ui/react";
import {
  ChakraProvider,
  Container,
  Box,
  Flex,
  Button,
  ButtonGroup,
  Select,
  Center,
  Spinner,
  Input,
  Text,
} from "@chakra-ui/react";

import theme from "./Theme.js";

import { ColorModeScript } from "@chakra-ui/react";
import ToggleColorMode from "../Components/ToggleColorMode";

const MockInterview = () => {
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const navigate = useNavigate();
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

    getUserMedia({ video: true, audio: false }, (mediaStream) => {
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
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <Container
        as="section"
        maxWidth="4x1"
        py="20px"
        style={{ paddingBottom: "85px" }}
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <ButtonGroup variant="ghost" spacing="4">
              <Button
                onClick={() => navigate("/feedback")}
                variant="ghost"
                size="md"
                borderRadius="md"
                colorScheme="Gray"
                _hover={{ bg: "maroon", color: "#2C5282" }}
                _active={{ bg: "#D6BCFA", color: "#2C5282" }}
                border="2px solid #CBD5E0"
                px={4}
                fontWeight="normal"
              >
                End Interview
              </Button>
              <ToggleColorMode />
            </ButtonGroup>
          </Box>
        </Flex>

        <Box w="50%" h="80vh" p={4}>
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

          <Box
            position="absolute"
            top={{ base: "250px", md: "50px" }}
            right={{ base: "0", md: "0" }}
            zIndex={1}
          >
            <Box className="webcamContainer">
              <Box className="webcamText">
                Send <strong>{peerId}</strong> to peer to join.
              </Box>
              <Box display="flex" alignItems="center">
                <Input
                  type="text"
                  value={remotePeerIdValue}
                  onChange={(e) => setRemotePeerIdValue(e.target.value)}
                  mr={2}
                />
                <Button
                  colorScheme="blue"
                  onClick={() => call(remotePeerIdValue)}
                >
                  Webcam
                </Button>
              </Box>
              <Box display="flex" mt={2}>
                <Box mr={2}>
                  <video
                    ref={currentUserVideoRef}
                    style={{ maxWidth: "200px", maxHeight: "150px" }}
                  />
                </Box>
                <Box>
                  <video
                    ref={remoteVideoRef}
                    style={{ maxWidth: "200px", maxHeight: "150px" }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </ChakraProvider>
  );
};

export default MockInterview;
