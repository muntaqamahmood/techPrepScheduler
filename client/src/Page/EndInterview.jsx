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

const endInterview = () => {
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
            </ButtonGroup>
          </Box>
        </Flex>
        <Box as="section" pt="20px" pb="20px">
          <Text fontSize="4xl" fontWeight="bold" textAlign="center">
            Thank you for your time!
          </Text>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Your interview has concluded.
          </Text>
        </Box>
        <Footer />
      </Container>
    </ChakraProvider>
  );
};

export default endInterview;
