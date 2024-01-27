"use client";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import ChatPage from "../chatClient/page";
import styles from"./chat.module.css"
import axios from "axios";
import { Modal } from "react-responsive-modal";
import ChatIcon from '@mui/icons-material/Chat';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import 'react-responsive-modal/styles.css';

// import { error } from "console";
export default function Home({idRoom,user,company}:any) {
  
  useEffect(() => {
    axios.get(`http://localhost:3000/api/allChat`)
      .then(e=>{
         setChat(e.data)
      }).catch(error=>console.error(error))
    },[])

    

  const idcompany=localStorage.getItem(("idcompany"))
  const id=localStorage.getItem("id")
  const [showChat, setShowChat] = useState(false);
  const [chat, setChat] = useState([]);
  const [userId, setUserId] = useState(id || user);
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setRoomId] = useState(chat.length+1);
  const [companyId,setCompanyId]=useState(idcompany || company )
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  var socket: any;
  socket = io("http://localhost:7000");
console.log(socket,"socket");


  const handleJoin = () => {
    // if(!idcompany){setRoomId()}
    // else{setRoomId(idRoom)}
      socket.emit("join_room", roomId);
      setShowSpinner(true);

      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false);
      }, 2000);
   
  };

  
  console.log("idroom",roomId,"user",userId)

  return (
    <div>
           

      <div
        className={styles.main_div}
        style={{ display: showChat ? "none" : "" }}
      >
        {/* <input
          className={styles.main_input}
          type="text"
          placeholder="Username"
          onChange={(e) => setUserId(e.target.value)}
          disabled={showSpinner}
        />
        <input
          className={styles.main_input}
          type="text"
          placeholder="room id"
          onChange={(e) => setroomId(e.target.value)}
          disabled={showSpinner}
        /> */}
        <button className={styles.main_button} onClick={() => handleJoin()}>
          {!showSpinner ? (
            <div className="w-[50px] h-[50px] rounded-full bg-gray-600 flex justify-center items-center"><QuestionAnswerIcon/></div>
            
          ) : (
            <div className={styles.loading_spinner}></div>
          )}
        </button>
      </div>

      <div style={{ display: !showChat ? "none" : "" }}>
      
        <ChatPage socket={socket} roomId={roomId} userId={userId}  companyId={companyId} className="absolute"/>
      </div>
      
    </div>
  );
}