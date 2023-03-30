import React, {useState} from 'react'
import io from 'socket.io-client'
import ChatRoom from './ChatRoom';
import "../Styles/Chat.css";

const Chat = () => {

    const socket = io.connect("http://localhost:5001");

    const [username, setUsername] = useState("");
    const [room , setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);


    const joinRoom  = () =>{
        if (username !== "" && room !== ""){
          socket.emit("join_room", room);
          setShowChat(true);



        }



    }

  return (
   <div className='Chat'>
    {!showChat ? (
    <div className='joinChatContainer'>
        <h1>join a chat</h1>
        <input type = "text" 
                placeholder='john..' 
                onChange={(event)=>{setUsername(event.target.value);
                }} />
        <input type = "text" placeholder='ROOM ID...'
                 onChange={(event)=>{setRoom(event.target.value);
                 }}
                 
                 />
        <button onClick = {joinRoom}> Join a Room </button>
        </div>
          ) : (
        <ChatRoom socket={socket} username={username} room = {room}/>
        )}
    </div>
  )
}

export default Chat
