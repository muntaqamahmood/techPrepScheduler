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
  Input,
  Card,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import theme from "./Theme.js";
import { ColorModeScript } from "@chakra-ui/react";
import ToggleColorMode from "../Components/ToggleColorMode";
import ButtonMailto from "../Components/MailTo";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Feedback = () => {
  const location = useLocation();
  const user = location.state.user;
  const [subject, setSubject] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [intervieweeRating, setIntervieweeRating] = useState(0);
  const [interviewerRating, setInterviewerRating] = useState(0);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSendFeedback = async (e) => {
    e.preventDefault();
    const feedbackData = { subject, feedback };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DOMAIN_ADDRESS_API}/feedback/`,
        {
          userEmail: user.email,
          feedbackData,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status !== 200) {
        throw new Error("Failed to send feedback");
      }
      // Success message
    } catch (error) {
      console.error(error);
    }

    // Reset form values
    setSubject("");
    setFeedback("");
    // show a success message on the UI that the feedback was sent
    setFeedbackSent(true);
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/feedback", {
        intervieweeRating,
        interviewerRating,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <Container
        as="section"
        maxWidth="4x1"
        py="20px"
        style={{ paddingBottom: "350px" }}
      >
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
            Rate your Mock Interview Experience!
          </Text>
          <Box as="form" onSubmit={handleSubmit}>
            <FormControl id="interviewee-rating" mb="4">
              <FormLabel>Rate the Interview:</FormLabel>
              <Select
                placeholder="--Please choose an option--"
                value={intervieweeRating}
                onChange={(event) => setIntervieweeRating(event.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box as="section" pt="20px" pb="20px">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Please provide us with your feedback so that we can improve our Web
            Application!
          </Text>
          <Card>
            <Input
              placeholder="Subject of Feedback"
              htmlSize={4}
              width="auto"
              value={subject}
              onChange={handleSubjectChange}
            />
            <Input
              placeholder="Your Feedback"
              htmlSize={4}
              width="auto"
              value={feedback}
              onChange={handleFeedbackChange}
            />
            <Button
              onClick={handleSendFeedback}
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
              Send Feedback
            </Button>
          </Card>
          {feedbackSent && (
            <Text
              fontSize="lg"
              mt="10px"
              color="green.500"
              fontWeight="bold"
              textAlign="center"
            >
              Feedback sent successfully!
            </Text>
          )}
        </Box>
      </Container>
      <Footer />
    </ChakraProvider>
  );
};

export default Feedback;
