import React from "react";
import "../Styles/Footer.css";

import { Text, ChakraProvider, useColorModeValue } from "@chakra-ui/react";
import theme from "../Page/Theme.js";
import { ColorModeScript } from "@chakra-ui/react";

function Footer() {
  const textColor = useColorModeValue("gray.900", "gray.50");

  return (
    <footer>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Text className="text-center" color={textColor}>
          © 2023 TechPrep Scheduler. All rights reserved.
        </Text>
      </ChakraProvider>
    </footer>
  );
}

export default Footer;
