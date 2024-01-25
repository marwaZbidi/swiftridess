
"use client"
import axios from 'axios';
import React, { useState, useEffect } from "react";


interface Reservation {
  currentDateTime: string;
  returnDate: string
  user: {
    fullName: string,
    phoneNumber: string,
    email: string
  },
  car: {
    serialCar: number,
    brand: string,
    model: string
  }
}



const Reservation = ({idcompany}:any) => {
  const [currentEvents, setCurrentEvents] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");


   
useEffect(() => {
  const getOneCompany = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/company/reservation/${idcompany}`);
      setCurrentEvents(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  getOneCompany()
},[])
  return (
        <div>
         
 
     
       { currentEvents.map((event,i) => (
          <div key={i}>
<ul>
  <li>FullName{event.user.fullName}</li>
  <li>Email:{event.user.email}</li>
  <li>Brand Car:{event.car.brand}</li>
  <li>Model:{event.car.model}</li>
  <li>Start Date:{event.currentDateTime}</li>
  <li>Return Date:{event.returnDate}</li>

</ul>
        </div>
        ))}

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