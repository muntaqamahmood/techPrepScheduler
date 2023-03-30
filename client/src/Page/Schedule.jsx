import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import "../Styles/Schedule.css";
import "../Styles/Footer.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { useLocation } from "react-router-dom";
import InterviewList from "./InterviewList";
import logo from "../media/tpslogo.png";
import Footer from "../Components/Footer";
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
  Grid,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import theme from "./Theme.js";
import { ColorModeScript } from "@chakra-ui/react";
import ToggleColorMode from "../Components/ToggleColorMode";

const Schedule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [interviewData, setInterviewData] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5001/api/interviews/`, {
      userEmail: user.email,
      title,
      description,
      selectedDate,
    });

    console.log("Submitting form...");
    console.log("Selected date:", selectedDate);
    console.log("Title:", title);
    console.log("Description:", description);
    // Reset form values
    setSelectedDate(new Date());
    setTitle("");
    setDescription("");
  };

  const hideShow = () => {
    const toggle_button = document.querySelector(".toggle-btn");
    const hideorshow = document.querySelector(".toggle-btn").innerHTML;
    const formelement = document.querySelector(".schedule-form");
    if (hideorshow === "Hide") {
      formelement.style.display = "none";
      toggle_button.innerHTML = "Show";
    } else {
      formelement.style.display = "block";
      toggle_button.innerHTML = "Hide";
    }
  };

  function handleSignOut(e) {
    e.preventDefault();
    localStorage.removeItem("user"); // remove user object from local storage
    navigate("/");
  }

  useEffect(() => {
    const fetchInterviewData = async () => {
      const res = await axios.get(`http://localhost:5001/api/interviews/all`);
      console.log("Fetching interview data...");
      console.log(res);
      setInterviewData(res.data);
    };
    fetchInterviewData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <Container
        as="section"
        maxWidth="4x1"
        py="20px"
        style={{ paddingBottom: "150px" }}
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

        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={10}>
          <Box className="schedule" marginTop="4rem">
            <Flex
              alignItems="center"
              justifyContent="flex-start"
              border="1px solid gray"
              borderRadius="small"
              borderWidth="4rm"
              p={5}
              backgroundColor="gray.400"
            >
              <Text className="title-text" fontSize="xl" fontWeight="bold">
                Create An Interview
              </Text>
              <Button
                type="button"
                className="toggle-btn"
                id="toggle"
                onClick={hideShow}
                marginLeft="auto"
              >
                Hide
              </Button>
            </Flex>

            <VStack
              as="form"
              className="schedule-form"
              onSubmit={handleSubmit}
              spacing={4}
              backgroundColor="#38B2AC"
              p={5}
            >
              <FormControl id="title">
                <FormLabel>Title:</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Description:</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id="datetime">
                <FormLabel>Date and Time:</FormLabel>
                <DateTimePicker
                  onChange={handleDateChange}
                  value={selectedDate}
                  format={"y-MM-dd  h a"}
                  required
                  amPmAriaLabel={"Select AM/PM"}
                  className="datetime-picker-black-text"
                />
              </FormControl>
              <Box
                className="buttons"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  type="submit"
                  variant="ghost"
                  size="md"
                  marginTop={4}
                  colorScheme="gray"
                  bg="yellow.400"
                  _hover={{ bg: "#BEE3F8", color: "#2C5282" }}
                  _active={{ bg: "#D6BCFA", color: "#2C5282" }}
                  border="2px solid #CBD5E0"
                  px={4}
                  fontWeight="bold"
                  borderRadius="full"
                >
                  Submit
                </Button>
              </Box>
            </VStack>
          </Box>

          <InterviewList interviews={interviewData} user={user} />
        </Grid>
      </Container>

      <Footer></Footer>
    </ChakraProvider>
  );
};

export default Schedule;
