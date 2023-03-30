import React, {useState} from 'react'
import io from 'socket.io-client'
import ChatRoom from './Chat';
import "../Styles/Chat.css";
import { useLocation } from "react-router-dom";

const Chat = ({socket, username, room}) => {
    
    // const [username, setUsername] = useState("");
    // const [room , setRoom] = useState("");
    // const [showChat, setShowChat] = useState(false);


    const joinRoom  = () =>{
          socket.emit("join_room", room);

    }

  return (
    <div className="Chat">
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
          />
          <input
            type="text"
            placeholder="Room ID..."
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      
        <ChatRoom socket={socket} username={username} room={room} />
      
    </div>
  )
}

export default Chat