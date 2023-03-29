import React ,{useState}from 'react'

const ChatRoom = ({socket, username , room}) => {
    const [currentMessage, setCurrentMessage] = useState("");



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
            await socket.emit("send_message", messageData);
        }
    };



  return (
    <div>
      <div className='chat-header'>



      <p>live chat</p>
      </div>
         
      <div className='chat-body'></div>
      <div className='chat-footer'>

        <input type="text" placeholder='Hey...'
        onChange={(event)=>{setCurrentMessage(event.target.value);
        }}/>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default ChatRoom
