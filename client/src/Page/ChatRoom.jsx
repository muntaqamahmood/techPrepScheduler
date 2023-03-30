import React ,{useState, useEffect}from 'react'
import ScrollToBottom from "react-scroll-to-bottom";

const ChatRoom = ({socket, username , room}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);


    const sendMessage=async() =>{
        //dont want to sent empty msg
        if (currentMessage !==""){

            //send this to socket server
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),

            };
            console.log(messageData);
            await socket.emit("send_message", messageData);
        }
    };


 
    useEffect(()=>{

        socket.on("receive_message", (data)=>{
            setMessageList((list) => [...list, data]);
        });


    }, [socket]);



  return (
    <div className="chat-window">
      <div className='chat-header'>



      <p>live chat</p>
      </div>
         
      <div className='chat-body'>
        
     




      </div>

      <div className="chat-footer">
      <input type="text" placeholder='Hey...'
        onChange={(event)=>{setCurrentMessage(event.target.value);
        }}/>

        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default ChatRoom
