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
  Center,
  Divider,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react";
import theme from "./Theme.js";
import { ColorModeScript } from "@chakra-ui/react";
import ToggleColorMode from "../Components/ToggleColorMode";

import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Footer from "../Components/Footer";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state.user;
  const [interviewsJoined, setInterviewsJoined] = useState([]);
  const [interviewsPosted, setInterviewsPosted] = useState([]);

  const { isOpen: JIisOpen, onToggle: JIonToggle } = useDisclosure();

  const { isOpen: PIisOpen, onToggle: PIonToggle } = useDisclosure();

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
              <ToggleColorMode />
            </ButtonGroup>
          </Box>
        </Flex>

        <Box textAlign="center" p={4}>
          <Avatar
            size="xl"
            name={user.name}
            src={user.picture}
            bgColor="Black"
            colorScheme="blackAlpha"
            boxShadow="md"
          />

          <Text size="lg" mt={4}>
            My Name: {user.name}
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
              bg="teal.400"
              rounded="md"
              shadow="md"
            >
              <Heading as="h3" size="lg">
                My Joined Interviews:{" "}
              </Heading>
              {interviewsJoined.length > 0 ? (
                <List spacing={3} mt={4}>
                  {interviewsJoined.map((interview) => (
                    <ListItem key={interview._id}>
                      <Box>
                        <Text fontWeight="bold">Title: </Text>
                        <Text>{interview.title}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Desc: </Text>
                        <Text>{interview.description}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Date: </Text>
                        <Text>
                          {new Date(interview.date).toLocaleDateString()}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Time: </Text>
                        <Text>
                          {new Date(interview.date).toLocaleTimeString()}
                        </Text>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Text>No upcoming interviews</Text>
              )}

              <Divider my={8} />
            </Box>
          </ScaleFade>

          <ScaleFade initialScale={0.9} in={PIisOpen}>
            <Box
              p="40px"
              color="white"
              mt="4"
              bg="teal.400"
              rounded="md"
              shadow="md"
            >
              <Heading as="h3" size="lg">
                My Posted Interviews:{" "}
              </Heading>
              {interviewsPosted.length > 0 ? (
                <List spacing={3} mt={4}>
                  {interviewsPosted.map((interview) => (
                    <ListItem key={interview._id}>
                      <Box>
                        <Text fontWeight="bold">Title: </Text>
                        <Text>{interview.title}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Desc: </Text>
                        <Text>{interview.description}</Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Date: </Text>
                        <Text>
                          {new Date(interview.date).toLocaleDateString()}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontWeight="bold">Time: </Text>
                        <Text>
                          {new Date(interview.date).toLocaleTimeString()}
                        </Text>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Text>No posted interviews</Text>
              )}
            </Box>
          </ScaleFade>
        </Box>
      </Container>
      <Footer />
    </ChakraProvider>
  );
};

export default Profile;
