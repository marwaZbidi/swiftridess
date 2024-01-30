"use client"
import React, { useState } from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import Modal from '@mui/material/Modal';
import Clifford from "./clifford/page";
import Head from "./navbar/page";
import Add from "./Add/page";
import Marques from "./CarModels/Marques"
import Date from "./DateTime/Date"
import Location from "./DateTime/Location"
import MostRatedCars from "./CarModels/MostRatedCars"
import Stats from "./stats/page"
import Occaion from "./SearchBuyOccasion/page";
import AboutUs from "./AboutUs/page";
import ClientFeedBack from "./ClientFeedBack/page";
import Foot from "./footer/page"
import "./home.css"

const Home = () => {
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen); 
    };

    return ( 
        <div className="home-container">
            <Head/>
            <Add/>
            <Marques/>
            <Location/>
            <MostRatedCars/>
            <Stats/>
            <Occaion/>
            <AboutUs/>
            <ClientFeedBack/>
            
            <div className="chat-icon" onClick={toggleChat}>
                <ChatIcon />
            </div>
    
            <Modal open={isChatOpen} onClose={toggleChat}>
                <div className="chat_div">
                    <div className="chat-modal-content">
                        <Clifford />
                    </div>    
                </div>   
            </Modal>      
            
            <Foot/>
        </div>
    );
}
 
export default Home;
