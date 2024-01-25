
"use client"
import axios from 'axios';
import { Typography } from "@mui/material";
import Sidebar from "../sidebar/page";
import React, { useState, useEffect } from "react";
import {
  Box,
  List,
} from "@mui/material";

interface Reservation {
  currentDateTime: string;
  returnDate: string;
  iduser: number;
  idcar: number;
  idcompany: number;
}

interface Company {
  idcompany: number;
  companyName: string;
}

const Reservation = () => {
  const [currentEvents, setCurrentEvents] = useState<Reservation[]>([]);
  const [companyData, setCompanyData] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  // const [calendarEvents, setCalendarEvents] = useState<any[]>([]);


    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/reservation');
        setCurrentEvents(response.data);
      } catch (error) {
        console.log(error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {   
    fetchData();
  }, []);

  // const getOneCompany = async (idcompany: number) => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/api/company/reservation/${idcompany}`);
  //     console.log('Response:', response.data); // Log the response data
  //     setCurrentEvents(response.data);
  //     setCalendarEvents(convertReservationsToCalendarEvents(response.data));
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-4 ml-[350px]">
        <div>
          <Typography variant="h1" fontWeight="bold" style={{ color: '#000080' }}>
            Calendar
          </Typography>
 
    

<div className="flex   bg-white mt-[100px]">
  <table className="w-full min-w-max table-auto text-left ">
    <thead>
      <tr>
        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
          <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Company</p>
        </th>
        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
          <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Car</p>
        </th>
        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
          <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Client</p>
        </th>
        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
          <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Start Date </p>
        </th>
        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
          <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">Return Date</p>
        </th>
        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
          <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70"></p>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
      {companyData.map((e, i) => (
        
        <td className="p-4 border-b border-blue-gray-50 ">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">555</p>
        </td>
   
      ))}
       { currentEvents.map((event) => (
          <div>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
        <img src="https://docs.material-tailwind.com/img/logos/logo-spotify.svg" alt="Spotify" className="inline-block relative object-center !rounded-full w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"/>
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">486</p>
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">4568</p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">531453
              </p>
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">345345</p>
            </div>
          </div>
        </td>
        </div>
        ))}

      
      </tr>
     
    </tbody>
  </table>

</div>

</div>








        </div> 
      </div>

  );
};

export default Reservation;








          {/* {companyData.map((e, i) => (
                <ul key={i}>
                  <button onClick={() => getOneCompany(e.idcompany)}>
                    <li>Company:{e.companyName}</li>
                  </button>
                </ul>
              ))}
              <Typography variant="h5">Events</Typography>
              <List>
                {currentEvents.map((event) => (
                  <ul key={event.currentDateTime}>
                    <li>Client: {event.user.fullName}</li> */}
                    {/* <li>PhoneNumber: {event.user.phoneNumber}</li> */}
                    {/* <li>Email: {event.user.email}</li> */}
                    {/* <li>Brand: {event.car.brand}</li>
                    <li>Model: {event.car.model}</li>
                    <li>Date reservation: {event.currentDateTime}</li>
                    <li>Date End: {event.returnDate}</li>
                  </ul>
                ))} */}
              {/* </List>
            </Box>  */}

              {/* <FullCalendar
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
  events={calendarEvents}
  eventContent={(eventInfo) => (
    <>
      <strong>{eventInfo.timeText}</strong>
      <p>{eventInfo.event.title}</p>
      <p>{eventInfo.event.extendedProps.note}</p>
    </>
  )}
/> */}    {/* </Box> */}