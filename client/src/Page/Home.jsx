import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "../Styles/Home.css";
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
} from "@chakra-ui/react";
import theme from "./Theme.js";
import { ColorModeScript } from "@chakra-ui/react";
import homepic from "../media/homepic.jpg";

import ToggleColorMode from "../Components/ToggleColorMode";

const Home = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  function handleCallback(resp) {
    var userObj = jwt_decode(resp.credential);
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj)); // save user object to local storage

    const createUser = async () => {
      await axios.post("http://localhost:5001/api/users", {
        name: userObj.name,
        email: userObj.email,
      });
    };
    createUser();
    navigate("/profile", { state: { user: userObj } });
  }

  function handleSignOut(e) {
    e.preventDefault();
    google.accounts.id.disableAutoSelect();
    setUser({});
    localStorage.removeItem("user"); // remove user object from local storage
    window.location.reload();
    navigate("/");
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // check if there is a user object in local storage
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const loadScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    loadScript()
      .then(() => {
        /* global google */
        google.accounts.id.initialize({
          client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
          callback: handleCallback,
        });

        google.accounts.id.renderButton(document.getElementById("loginDiv"), {
          theme: "outline",
          size: "large",
        });
        if (!localStorage.getItem("user")) {
          google.accounts.id.prompt();
        }
      })
      .catch((error) => {
        console.error("Error loading Google Sign-In client library", error);
      });
    // eslint-disable-next-line
  }, []);

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
              <Button
                as={Link}
                href="/"
                variant="ghost"
                size="md"
                borderRadius="md"
                colorScheme="Gray"
                _hover={{ bg: "#BEE3F8", color: "#2C5282" }}
                _active={{ bg: "#D6BCFA", color: "#2C5282" }}
                border="2px solid #CBD5E0"
                px={4}
                fontWeight="normal"
              >
                Home
              </Button>

              <Button
                as={Link}
                href="/aboutus"
                variant="ghost"
                size="md"
                borderRadius="md"
                colorScheme="Gray"
                _hover={{ bg: "#BEE3F8", color: "#2C5282" }}
                _active={{ bg: "#D6BCFA", color: "#2C5282" }}
                border="2px solid #CBD5E0"
                px={4}
                fontWeight="normal"
              >
                About Us
              </Button>

              {Object.keys(user).length === 0 && (
                <Button>
                  <div id="loginDiv"></div>
                </Button>
              )}
              {Object.keys(user).length !== 0 && user && (
                <Button
                  onClick={() => navigate("/profile", { state: { user } })}
                  variant="ghost"
                  size="md"
                  borderRadius="md"
                  colorScheme="Gray"
                  _hover={{ bg: "#BEE3F8", color: "#2C5282" }}
                  _active={{ bg: "#D6BCFA", color: "#2C5282" }}
                  border="2px solid #CBD5E0"
                  px={4}
                  fontWeight="normal"
                >
                  Profile
                </Button>
              )}
              {Object.keys(user).length !== 0 && (
                <Button
                  className="signOut-button"
                  onClick={(e) => handleSignOut(e)}
                  variant="ghost"
                  size="md"
                  borderRadius="md"
                  colorScheme="Gray"
                  _hover={{ bg: "#BEE3F8", color: "#2C5282" }}
                  _active={{ bg: "#D6BCFA", color: "#2C5282" }}
                  border="2px solid #CBD5E0"
                  px={4}
                  fontWeight="normal"
                >
                  Sign Out
                </Button>
              )}

              <ToggleColorMode />
            </ButtonGroup>
          </Box>
        </Flex>

        <Box className="slogan">
          <Box
            mb="30px"
            mr="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              objectFit="cover"
              boxSize="200px"
              borderRadius="full"
              boxShadow="lg"
              src={homepic}
            />
          </Box>

          <h1 data-text="Sharpen Your Skills, Ace Your Interviews">
            Sharpen Your Skills, Ace Your Interviews
          </h1>
          <br></br>
          <br></br>
          <Text fontSize="2xl" color="blue.300">
            Sign in now to get started with your mock interview or host a mock
            interview with a friend! It's free!
          </Text>
        </Box>
      </Container>
      <Footer />
    </ChakraProvider>
  );
};

export default Home;
