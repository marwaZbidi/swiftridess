"use client"
import axios from 'axios';
import { Typography } from "@mui/material"
import Sidebar from "../sidebar/page"
import React,{useState,useEffect } from "react"
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  Box,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

interface Reservation {
  currentDateTime: string;
  user: {
    fullName: string;
    phoneNumber: number;
    email: string;
  };
  car: {
    idcars: number;
    brand: string;
    model: string;
  };
}

const calendar =()=>{
 
  const [currentEvents, setCurrentEvents] = useState<Reservation[]> ([]);
  let idcompany= typeof window !== 'undefined' ? localStorage.getItem("id"): null;


  useEffect(() => {
    const Data = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/company/reservation/${idcompany}`);
        console.log('Response:', response.data); // Log the response data
        setCurrentEvents(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    Data();
  }, []);


  const handleDateClick = (selected:any) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
      });
    }
  };

  // const handleEventClick = (selected:any) => {
  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete the event '${selected.event.title}'`
  //     )
  //   ) {
  //     selected.event.remove();
  //   }
  // };

    return (
        <div className="flex h-screen">
        <Sidebar/>
     
           {/* Main Content */}
           <div className="flex-1 bg-gray-100 p-4 ml-[350px]">
         
           <div>
           <Typography variant="h1" fontWeight="bold" style={{ color: '#000080' }}>
             calendar
           </Typography>
           <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          // backgroundColor={primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.user.fullName}
                sx={{
                  // backgroundColor:greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.user.phoneNumber}

                />
              </ListItem>
            ))}
          </List>
          </Box>
          </Box>

<Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            // eventsSet={(events) => setCurrentEvents(events)}
            // initialEvents={[
            //   {
            //     id: "12315",
            //     title: "All-day event",
            //     date: "2022-09-14",
            //   },
            //   {
            //     id: "5123",
            //     title: "Timed event",
            //     date: "2022-09-28",
            //   },
            // ]}
          />
        </Box>
        </div>
      </div>
    </div>

    )
}
export default calendar;