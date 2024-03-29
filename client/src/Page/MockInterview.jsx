import React, { useState } from "react";
import "../Styles/Chat.css";
import axios from "axios";
import Editor from "@monaco-editor/react";
import WhiteboardPopup from "./WhiteboardPopup";
import ZoomBox from "../Components/ZoomInOut";
import "../Styles/MockInterview.css";
import { useEffect, useRef } from "react";
import Peer from "peerjs";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useColorModeValue } from "@chakra-ui/react";
import { InputGroup, InputRightElement } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Chat from "../Components/Chat";
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
import io from "socket.io-client";
import theme from "./Theme.js";

import { ColorModeScript } from "@chakra-ui/react";
import ToggleColorMode from "../Components/ToggleColorMode";

const MockInterview = () => {
  const params = new URLSearchParams(window.location.search);
  const roomId = params.get("roomId");

  const [screenStream, setScreenStream] = useState(null);
  const screenVideoRef = useRef(null);
  const remoteScreenRef = useRef(null);
  const [scale, setScale] = useState(1);

  function handleZoomIn() {
    setScale(scale + 0.1);
  }

  function handleZoomOut() {
    setScale(scale - 0.1);
  }

  const socket = io.connect(`${process.env.REACT_APP_DOMAIN_ADDRESS_SOCKET}`);
  const location = useLocation();
  const user = location.state.user;
  const [message, setMessage] = useState("");
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

  const startScreenSharing = async (remotePeerId) => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setScreenStream(stream);
      screenVideoRef.current.srcObject = stream;
      screenVideoRef.current.play();

      // initiate call with the remote peer
      const call = peerInstance.current.call(remotePeerId, stream);
      call.on("stream", (remoteStream) => {
        // do nothing
      });
    } catch (err) {
      console.log("Error starting screen sharing", err);
    }
  };

  const handleEndInterview = () => {
    navigate("/feedback", { state: { user: user } });
  };

  const onChange = (newValue, e) => {
    setCode(newValue);
  };

  const compileCode = async () => {
    setLoading(true);
    try {
      console.log("Compiling code");
      console.log(process.env);
      console.log(language, code);

      const response = await axios.post(
        `${process.env.REACT_APP_DOMAIN_ADDRESS_API}/compiles/`,
        {
          language: language === "python" ? "python3" : language,
          script: code,
        }
      );
      console.log("response from backend", response.data.output);
      setOutput(response.data.output || response.data.rntError);
    } catch (error) {
      console.log(error);
      setOutput(error.msg);
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
    //socket code
    socket.emit("join_room", roomId);

    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream);
          call.on("stream", function (remoteStream) {
            // Show stream in some video/canvas element.
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        })
        .catch((error) => {
          console.error("Error accessing media devices.", error);
        });
    });

    peerInstance.current = peer;
  }, []);
  const call = (remotePeerId) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();

        // initiate call with the remote peer for webcam stream
        const call = peerInstance.current.call(remotePeerId, mediaStream, {
          video: true,
          audio: false,
        });
        call.on("stream", (remoteStream) => {
          // Show remote stream in the remote video element.
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  };

  // handle click event for screen share button
  const handleScreenShare = () => {
    // prompt user to enter peer ID to share screen with
    const remotePeerId = prompt("Enter peer ID to share screen with:");
    startScreenSharing(remotePeerId);
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
                onClick={handleEndInterview}
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
          <Box position="fixed" bottom="20px" right="20px">
            <Chat socket={socket} username={user.name} room={roomId} />
          </Box>
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
            height="calc(10% - 20px)"
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
            {/* peerJS */}
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
              <Button colorScheme="blue" onClick={handleScreenShare}>
                Share Screen
              </Button>

              <Box display="flex" mt={2}>
                <Box mr={2}>
                  <video
                    ref={currentUserVideoRef}
                    style={{ maxWidth: "200px", maxHeight: "150px" }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              w="400px"
              h="400px"
              transform={`scale(${scale})`}
              transition="transform 0.2s ease-out"
              marginLeft={{ base: "0", md: "200px" }}
            >
              <Button
                onClick={handleZoomIn}
                variant="ghost"
                size="md"
                borderRadius="md"
                colorScheme="Gray"
                _hover={{ bg: "blue.200", color: "#2C5282" }}
                _active={{ bg: "#D6BCFA", color: "#2C5282" }}
                border="2px solid #CBD5E0"
                px={4}
                fontWeight="normal"
              >
                Zoom In
              </Button>
              <Button
                onClick={handleZoomOut}
                variant="ghost"
                size="md"
                borderRadius="md"
                colorScheme="Gray"
                _hover={{ bg: "blue.200", color: "#2C5282" }}
                _active={{ bg: "#D6BCFA", color: "#2C5282" }}
                border="2px solid #CBD5E0"
                px={4}
                fontWeight="normal"
              >
                Zoom Out
              </Button>

              <Box>
                <video
                  className="webcam video"
                  ref={remoteVideoRef}
                  style={{ maxWidth: "200px", maxHeight: "150px" }}
                />
                <video
                  ref={screenVideoRef}
                  style={{ maxWidth: "500px", maxHeight: "450px" }}
                />
                <video
                  ref={remoteScreenRef}
                  style={{ maxWidth: "200px", maxHeight: "150px" }}
                />
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
