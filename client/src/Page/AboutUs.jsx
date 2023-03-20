import React from "react";

import logo from "../media/tpslogo.png";
import {
  Heading,
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
import { ColorModeScript, AnimatePresence } from "@chakra-ui/react";
import ToggleColorMode from "../Components/ToggleColorMode";
import { motion } from "framer-motion";

function AboutUs() {
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 4,
      },
    },
  };

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
                href="http://localhost:3000/"
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
                Home Page
              </Button>

              <ToggleColorMode />
            </ButtonGroup>
          </Box>
        </Flex>

        <Box marginTop="40px" marginBottom="20px">
          <motion.div variants={stagger} initial="initial" animate="animate">
            <Heading mb="4" color="#ECC94B">
              <motion.span variants={letter}>
                {" "}
                Description of our web application
              </motion.span>{" "}
            </Heading>

            <Text mb="20">
              <motion.span variants={letter}>
                TechPrep Scheduler is a web application to give computer science
                and
              </motion.span>{" "}
              <motion.span variants={letter}>
                software engineering professionals a realistic environment to
                prepare
              </motion.span>{" "}
              <motion.span variants={letter}>
                for technical interviews. Users can schedule mock interviews
                with other
              </motion.span>{" "}
              <motion.span variants={letter}>
                users and conduct mock interviews in real-time using our
                platform's live
              </motion.span>{" "}
              <motion.span variants={letter}>
                code editor and compiler, as well as its chat and voice chat
                features.
              </motion.span>{" "}
              <motion.span variants={letter}>
                Users can select to either be the interviewer or the interviewee
                when
              </motion.span>{" "}
              <motion.span variants={letter}>
                using TechPrep Scheduler. Users can ask questions, provide
                feedback,
              </motion.span>{" "}
              <motion.span variants={letter}>
                write and review code all through our platform's code editor,
                chat and
              </motion.span>{" "}
              <motion.span variants={letter}>voice chat features.</motion.span>{" "}
            </Text>

            <Heading mb="4" color="#ECC94B">
              <motion.span variants={letter}> Features</motion.span>{" "}
            </Heading>

            <Text mb="20">
              <motion.span variants={letter}>
                Live Code Editor, Live Compiler, User Authentication, User
                Profiles, User Scheduling, User Feedback with Webcam, Voice chat
                & Text Chat.
              </motion.span>{" "}
            </Text>

            <Heading mb="4" color="#ECC94B">
              <motion.span variants={letter}>Team Members</motion.span>{" "}
            </Heading>

            <Text>
              <motion.span variants={letter}>
                Andrew Qian, Shence Yang, Muntaqa Mahmood
              </motion.span>{" "}
            </Text>
          </motion.div>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default AboutUs;
