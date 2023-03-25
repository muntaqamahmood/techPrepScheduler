import Footer from "../Components/Footer";
import "../Styles/Home.css";
import logo from "../media/tpslogo.png";
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
import ToggleColorMode from "../Components/ToggleColorMode";
import ButtonMailto from "../Components/MailTo";

const feedback = () => {
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
                Return to Home
              </Button>
              <ToggleColorMode />
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
        <Box as="section" pt="20px" pb="20px">
          <Text fontSize="4xl" fontWeight="bold" textAlign="center">
            Insert "Interview Feedback form" here
          </Text>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Rate the Interview in some form and display results in Feedback
            Dashboard.
          </Text>
        </Box>
        <Box as="section" pt="20px" pb="20px">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Please provide us with your feedback so that we can improve our
            service:
            <Button
              _hover={{ bg: "#BEE3F8", color: "#2C5282" }}
              _active={{ bg: "#D6BCFA", color: "#2C5282" }}
            >
              <ButtonMailto
                label="E-Mail TechPrep team"
                mailto="mailto:techprepcheduler@gmail.com"
              />
            </Button>
          </Text>
        </Box>
        <Footer />
      </Container>
    </ChakraProvider>
  );
};

export default feedback;
