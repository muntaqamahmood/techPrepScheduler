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
  Avatar,
  ChakraProvider,
  Text,
  Container,
  Box,
  Image,
  Flex,
  Link,
  Button,
  ButtonGroup,
  Center,
  Divider,
  Heading,
  List,
  ListItem,
  Spacer,
  Grid,
} from "@chakra-ui/react";
import theme from "./Theme.js";
import { ColorModeScript } from "@chakra-ui/react";
import ToggleColorMode from "../Components/ToggleColorMode";

import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";


import { SimpleGrid } from "@chakra-ui/react";












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
    await axios.post("http://localhost:5001/api/interviews/", {
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

  useEffect(() => {
    const fetchInterviewData = async () => {
      const res = await axios.get("http://localhost:5001/api/interviews/all");
      console.log("Fetching interview data...");
      console.log(res);
      setInterviewData(res.data);
    };
    fetchInterviewData();
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

            
                <ToggleColorMode />
            </ButtonGroup>
        </Box>
        </Flex>
   

      <div className="schedule">
        <div className="schedule-title">
          <Text className="title-text">Create An Interview</Text>
          <button
            type="button"
            className="toggle-btn"
            id="toggle"
            onClick={hideShow}
          >
            Hide
          </button>
        </div>
        <form className="schedule-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <label htmlFor="datetime">Date and Time:</label>

          <DateTimePicker
            id="datetime"
            onChange={handleDateChange}
            value={selectedDate}
            format={"y-MM-dd  h a"}
            required
            amPmAriaLabel={"Select AM/PM"}
          />

          <div className="buttons">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <InterviewList interviews={interviewData} user={user} />
      <Footer />
      
   
     </Container>
   
    </ChakraProvider>

  );
};

export default Schedule;
