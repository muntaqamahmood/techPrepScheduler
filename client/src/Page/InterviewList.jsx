import React, { useState } from "react";
import "../Styles/InterviewList.css";
import axios from "axios";
import moment from "moment";

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
} from "@chakra-ui/react";

import theme from "./Theme.js";

import { ColorModeScript } from "@chakra-ui/react";
import ToggleColorMode from "../Components/ToggleColorMode";

import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Footer from "../Components/Footer";


import interviewbg from "../media/interviewbg.jpg";



const InterviewList = ({ interviews, user }) => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [joinError, setJoinError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInterviewClick = (interview) => {
    setSelectedInterview(interview);
  };

  const handleJoinClick = () => {
    axios
      .put("http://localhost:5001/api/interviews/" + selectedInterview._id, {
        userEmail: user.email,
      })
      .then((response) => {
        setSuccessMessage("Successfully joined interview!");
        setSelectedInterview(null);
        setJoinError(null);
      })
      .catch((error) => {
        console.error(error);
        setJoinError(error.response.data.message);
      });
  };





  return (

    <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />

          <Container as="section" maxWidth="4x1" py="20px">


      <Box className="interview-list" >
  <Text fontSize="xl" fontWeight="bold"  border="1px solid gray"  borderRadius="small" borderWidth="4rm" p={5} backgroundColor = "gray.400" >
    All Interviews you can join :
  </Text>



  <Flex justifyContent="center" alignItems="center">
  <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap={10}>
    {interviews.map((interview) => (
      <Box
        key={interview._id}
        onClick={() => handleInterviewClick(interview)}
        cursor="pointer"
        border="1px solid gray"
        padding="10px"
        marginBottom="5px"
        borderRadius="5px"
        width="150%"
        height="250px"
        marginTop={5}
      >
       <Box display="block" marginBottom="30px" marginTop={2}>
          <strong>Username:</strong> {interview.creatorName}
        </Box>
        <Box display="block" marginBottom="30px">
          <strong>Title:</strong> {interview.title}
        </Box>
        <Box display="block" marginBottom="30px">
          <strong>Description:</strong> {interview.description}
        </Box>
        <Box display="block" marginBottom="10px">
          <strong>Interview Date:</strong>{" "}
          {moment(interview.date).format("MMMM Do YYYY, h a")}
          </Box>

      </Box>
    ))}
  </Box>
  </Flex>

  {selectedInterview && (
    <Box
      className="popup"
      borderWidth="1px"
      padding="10px"
      borderRadius="5px"
    >
      <Text>
        You have selected the interview "{selectedInterview.title}" by{" "}
        {selectedInterview.creatorName}.
      </Text>
      {joinError && <Text color="red">{joinError}</Text>}
      {successMessage && <Text color="green">{successMessage}</Text>}
      <Button onClick={handleJoinClick} marginRight="5px">
        Join Interview
      </Button>
      <Button onClick={() => setSelectedInterview(null)}>Cancel</Button>
    </Box>
    )}
    </Box>

              

        </Container>
    </ChakraProvider>
  );
};

export default InterviewList;
