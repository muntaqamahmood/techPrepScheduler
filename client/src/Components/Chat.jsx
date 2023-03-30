import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../Styles/Chat.css";
import { useLocation } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    //dont want to sent empty msg
    if (currentMessage !== "") {
      //console.log("send message", currentMessage);

      //send this to socket server
      const messageData = {
        room: room,
        author: username,
        socketid: socket.id,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      console.log(messageData);

      //how to handle async await to let send_message finish before moving on

      await socket.emit("send_message", messageData);

      setMessageList((list) => [...list, messageData]);

      console.log(currentMessage);

      //this doesnt clean the current msg idk why
      setCurrentMessage("");

      console.log(currentMessage);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Chat</p>
      </div>

      <Box
        className="chat-body"
        sx={{
          height: "400px",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "gray.200",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "teal.500",
            borderRadius: "full",
          },
        }}
      >
        {messageList.map((messageContent, index) => {
          return (
            <Flex
              key={index}
              className="message"
              id={username === messageContent.author ? "you" : "other"}
              flexDirection="column"
              alignItems={
                username === messageContent.author ? "flex-end" : "flex-start"
              }
            >
              <Box>
                <Box className="message-content">
                  <Text>{messageContent.message}</Text>
                </Box>
                <Flex
                  className="message-meta"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text id="time">{messageContent.time}</Text>
                  <Text id="author">{messageContent.author}</Text>
                </Flex>
              </Box>
            </Flex>
          );
        })}
      </Box>

      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
