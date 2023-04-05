import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";
import "../Styles/col.css";
import "../Styles/Footer.css";
import logo from "../media/tpslogo.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
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
  Divider,
  Heading,
  List,
  ListItem,
  Spacer,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import theme from "./Theme.js";
import { ColorModeScript } from "@chakra-ui/react";
import ToggleColorMode from "../Components/ToggleColorMode";

import { ScaleFade } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Footer from "../Components/Footer";

import { SimpleGrid } from "@chakra-ui/react";

import interviewbg from "../media/interviewbg.jpg";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state.user;
  const [interviewsJoined, setInterviewsJoined] = useState([]);
  const [interviewsPosted, setInterviewsPosted] = useState([]);
  const [showNotStartedModal, setShowNotStartedModal] = useState(false);

  const { isOpen: JIisOpen, onToggle: JIonToggle } = useDisclosure();

  const { isOpen: PIisOpen, onToggle: PIonToggle } = useDisclosure();

  function handleSignOut(e) {
    e.preventDefault();
    localStorage.removeItem("user"); // remove user object from local storage
    navigate("/");
  }

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/interviews/usersEmail/${user.email}`
        );
        setInterviewsJoined(res.data.interviewsJoined);
        setInterviewsPosted(res.data.interviewsPosted);
      } catch (err) {
        console.log(err);
      }
    };

    getInterviews();
  }, [user.email]);

  const InterviewNotStartedModal = ({ isOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Interview Not Started Yet</ModalHeader>
          <ModalBody>
            This interview has not started yet. Please try again later.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const joinInterview = (interviewStartTime, interviewId) => {
    const currentTime = new Date();
    const interviewTime = new Date(interviewStartTime);
    if (currentTime > interviewTime) {
      console.log("Interview has started");
      const enterId = prompt("Enter the room id");
      if (enterId === interviewId) {
        console.log("Correct room id");
        navigate(`/mockinterview?roomId=${interviewId}`, { state: { user } });
      } else {
        alert("Incorrect room id, try again");
      }
    } else {
      console.log("Interview has not started yet");
      setShowNotStartedModal(true);
    }
  };

  const InterviewItem = ({ interview }) => (
    <Box
      key={interview._id}
      p={4}
      borderRadius="md"
      borderWidth={1}
      borderColor="blackAlpha.300"
      width="100%"
      style={{
        backgroundImage: `url(${interviewbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      marginTop="20px"
    >
      <Grid templateColumns="auto 0.5fr" gap="1rem">
        <Text fontWeight="bold">Title:</Text>
        <Text>{interview.title}</Text>
        <Text fontWeight="bold">Desc:</Text>
        <Text>{interview.description}</Text>
        <Text fontWeight="bold">Date:</Text>
        <Text>{new Date(interview.date).toLocaleDateString()}</Text>
        <Text fontWeight="bold">Time:</Text>
        <Text>{new Date(interview.date).toLocaleTimeString()}</Text>
      </Grid>
      <Spacer />
      <Flex alignItems="center" justifyContent="center" mt={4}>
        <Button
          variant="ghost"
          size="md"
          borderRadius="lg"
          colorScheme="Blue"
          _hover={{ bg: "#BEE3F8", color: "#2C5282" }}
          border="2px solid #CBD5E0"
          px={4}
          fontWeight="normal"
          onClick={() => joinInterview(interview.date, interview._id)}
        >
          Join the interview
        </Button>
      </Flex>
    </Box>
  );

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

              <Button
                onClick={() => navigate("/schedule", { state: { user } })}
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
                Schedule
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

        <Box textAlign="center" p={4}>
          <Avatar
            size="2xl"
            name={user.name}
            src={user.picture}
            bgColor="Black"
            colorScheme="blackAlpha"
            boxShadow="md"
          />

          <Text fontSize="3xl" size="lg" mt={4}>
            Welcome back {user.name}!
          </Text>

          <Text size="lg" mt={2}>
            My Email: {user.email}
          </Text>

          <Divider my={8} />

          <Flex align="center">
            <Button mr={5} onClick={JIonToggle}>
              My Joined Interviews
            </Button>

            <Button mr={5} onClick={PIonToggle}>
              My Posted Interviews
            </Button>
          </Flex>

          <Box className="displayInfoSection"></Box>

          <ScaleFade initialScale={0.9} in={JIisOpen}>
            <Box
              p="40px"
              color="white"
              mt="4"
              bg="#C6F6D5"
              rounded="md"
              shadow="md"
            >
              <Heading as="h3" size="lg">
                My Joined Interviews:{" "}
              </Heading>

              {interviewsJoined.length > 0 ? (
                <List spacing={3} mt={4}>
                  {interviewsJoined.map((interview, index) => (
                    <ListItem key={interview._id} mt={index % 2 === 0 ? 6 : 0}>
                      {index % 2 === 0 && (
                        <SimpleGrid columns={2} spacing={10}>
                          <InterviewItem
                            key={interview._id}
                            interview={interview}
                          />
                          {interviewsJoined[index + 1] && (
                            <InterviewItem
                              key={interviewsJoined[index + 1]._id}
                              interview={interviewsJoined[index + 1]}
                            />
                          )}
                        </SimpleGrid>
                      )}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Text>No upcoming interviews</Text>
              )}

              <Divider my={8} />
            </Box>
          </ScaleFade>

          <ScaleFade
            initialScale={0.9}
            in={PIisOpen}
            className="postedInterviews"
          >
            <Box
              p="40px"
              color="white"
              mt="4"
              bg="teal.300"
              rounded="md"
              shadow="md"
            >
              <Heading as="h3" size="lg">
                My Posted Interviews:{" "}
              </Heading>

              {interviewsPosted.length > 0 ? (
                <List spacing={3} mt={5}>
                  {interviewsPosted.map((interview, index) => (
                    <ListItem key={interview._id} mt={index % 2 === 0 ? 6 : 0}>
                      {index % 2 === 0 && (
                        <SimpleGrid columns={2} spacing={10}>
                          <InterviewItem
                            key={interview._id}
                            interview={interview}
                          />
                          {interviewsPosted[index + 1] && (
                            <InterviewItem
                              key={interviewsPosted[index + 1]._id}
                              interview={interviewsPosted[index + 1]}
                            />
                          )}
                        </SimpleGrid>
                      )}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Text>No posted interviews</Text>
              )}
              <Divider my={8} />
            </Box>
            <InterviewNotStartedModal
              isOpen={showNotStartedModal}
              onClose={() => setShowNotStartedModal(false)}
            />
          </ScaleFade>
        </Box>
      </Container>
      <Footer />
    </ChakraProvider>
  );
};

export default Profile;
