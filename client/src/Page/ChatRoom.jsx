import React ,{useState, useEffect}from 'react'


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
            await socket.emit("send_message", messageData);
        }
    };


    //40:43
    useEffect(()=>{

        socket.on("receive_message", (data)=>{
            setMessageList((list) => [...list, data]);  //set the list state to whatever is before, at the end , add the new data
        });


    }, [socket]);



  return (
    <div className="chat-window">
      <div className='chat-header'>



      <p>live chat</p>
      </div>
         
      <div className='chat-body'>
      <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>




      </div>
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
