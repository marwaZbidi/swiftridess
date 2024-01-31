"use client"
import React ,{useState,useEffect} from "react";
import axios from "axios";
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import CommentIcon from '@mui/icons-material/Comment';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';  
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import Sidebar from "../sidebar/page"
import { AreaChart, Area,BarChart, XAxis, YAxis, Bar, Tooltip, Legend} from "recharts";
import "../fix.css"



const dashboard: React.FC  = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [carlength, setCarLength] = useState<number | null>(null)
  const [companylength, setCompanyLength] = useState<number | null>(null)
  const [clientlength, setClientLength] = useState<number | null>(null)
  const [feedbacklength, setFeedbackLength] = useState<number | null>(null)
  const [carcompany, setcarcompany] = useState<number | null>(null)
 const [allcars,setallcars] = useState<{}>({})


  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/feedback');
console.log("eee",response.data);

      } catch (error) {
        console.log(error);
        
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  

async function fetchData(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function fetchCarLength() {
  try {
    const data = await fetchData('http://localhost:3000/api/carlength');
    setCarLength( data.rowCount);
  } catch (error) {
    console.error('Error fetching car length:', error);
  }
}

console.log("length",carlength);

async function fetchCompanyLength() {
  try {
    const data = await fetchData('http://localhost:3000/api/companylength');
    setCompanyLength( data.rowCount);
  } catch (error) {
    console.error('Error fetching company length:', error);
  }
}

async function fetchClientLength() {
  try {
    const data = await fetchData('http://localhost:3000/api/clientlength');
    setClientLength( data.rowCount);
  } catch (error) {
    console.error('Error fetching client length:', error);
  }
}

async function fetchFeedbacktLength() {
  try {
    const data = await fetchData('http://localhost:3000/api/feedbacklength');
    setFeedbackLength( data.rowCount);
  } catch (error) {
    console.error('Error fetching client length:', error);
  }
}

async function getLength(id: number) {
  try {
    const data = await fetchData(`http://localhost:3000/api/company/cars/${id}`);
    setcarcompany( data.rowCount);
  } catch (error) {
    console.error('Error fetching client length:', error);
  }
}

async function getAlllengthcar(id: number) {
  try {
    const data = await fetchData(`http://localhost:3000/api/company/allcars/1`);
    setallcars( data.rowCount);
    console.log('eyouta',data);
    
    console.log('eeeyaa',allcars);
  } catch (error) {
    console.error('Error fetching client length:', error);
  }
}


getAlllengthcar(1)
getLength(1)
fetchCarLength();
fetchCompanyLength();
fetchClientLength();
fetchFeedbacktLength()



  const data = [
    {
      "day": "01/01",
      "Company": 20,
      "Client": 30
    },
    {
      "day": "08/01",
      "Company": 50,
      "Client": 40
    },
    {
      "day": "15/01",
      "Company": 80,
      "Client": 60
    },
    {
      "day": "22/01",
      "Company": 100,
      "Client": 70
    },
    {
      "day": "29/01",
      "Company": 100,
      "Client": 75
    },
    {
      "day": "05/02",
      "Company": 150,
      "Client": 90
    },
    {
      "day": "09/02",
      "Company": 150,
      "Client": 95
    }
  ]
  const bar = [
    {
        company: "Eclipse",
        cars : 20
    },
    {
      company: "Star",
      cars : 30
  },
  {
    company: "Rental",
    cars : 10
},
{
  company: "Fast Car",
  cars : 50
}
  ];



  return (
    <div className=" h-screen "> 
    <div className="">
   <Sidebar/>
   </div>
      {/* Main Content */}
 
      <div className="flex-1 bg-gray-100 p-4 ml-[300px] grid grid-col-2">
    
      
      <Typography variant="h2" fontWeight="bold" style={{ color: '#000080' }}>
         Welcome to your Dashboard 
      </Typography>
      
      <div className="flex-grow p-10">
        <Typography variant="h4" className="mb-6 text-gray-750">
          General Report    
        </Typography>

        <div className="grid grid-cols-4 gap-6">
          {/* Item Sales */}
          <Box className="p-4 bg-white rounded-md shadow-md transition transform hover:scale-105">
          <TimeToLeaveIcon color="primary" />
            <div className="flex items-center">
              <Typography variant="h4" fontWeight="bold"> {carlength !== null ? carlength : 'Data not available'}</Typography>

            </div>
            <Typography variant="h6" gutterBottom>
               Vehicles
            </Typography>
            <Box display="flex" justifyContent="space-between" mt="2px">
            <Typography
          variant="h5"
          fontStyle="italic" style={{ marginLeft: 'auto' }} sx={{ color: "green" }}>
          
        </Typography>
        </Box>
          </Box>

          {/* New Orders */}
          <Box className="p-4 bg-white rounded-md shadow-md transition transform hover:scale-105">
          <PersonAddOutlinedIcon color="primary"/>
          <Typography variant="h4" fontWeight="bold">{clientlength !== null ? clientlength : 'Data not available'}</Typography>
            <Typography variant="h6" gutterBottom>
              Clients
            </Typography>
            <Box display="flex" justifyContent="space-between" mt="2px">
            <Typography
          variant="h5"
          fontStyle="italic" style={{ marginLeft: 'auto' }} sx={{ color: "green" }}>
        
        </Typography>
        </Box>
          </Box>

          {/* Total Users */}
          <Box className="p-4 bg-white rounded-md shadow-md transition transform hover:scale-105">
          <PeopleOutlineOutlinedIcon color="primary" />
          <Typography variant="h4" fontWeight="bold">{companylength !== null ? companylength : 'Data not available'}</Typography>
          
            <Typography variant="h6" gutterBottom>
              Companies
            </Typography>
            <Box display="flex" justifyContent="space-between" mt="2px">
            <Typography
          variant="h5"
          fontStyle="italic" style={{ marginLeft: 'auto' }} sx={{ color: "red" }}>
         
        </Typography>
        </Box>
          </Box>

          {/* Another Box */}
          <Box className="p-4 bg-white rounded-md shadow-md transition transform hover:scale-105">
          <CommentIcon color="primary"/>
          <Typography variant="h4" fontWeight="bold">{feedbacklength !== null ? feedbacklength : 'Data not available'}</Typography>
          
            <Typography variant="h6">
              Feedbacks
            </Typography>
            <Box display="flex" justifyContent="space-between" mt="2px">
            <Typography
          variant="h5"
          fontStyle="italic" style={{ marginLeft: 'auto' }} sx={{ color: "green" }}>
         
        </Typography>
        </Box>
        </Box>

<div>
<div style={{ display: 'flex',  alignItems: 'center' }} className="mt-[100px]">
  <Typography variant="h5" style={{ color: '#000080' , whiteSpace: 'nowrap' }} >Sales Activities</Typography>
  <Typography variant="h5" style={{ color: '#000080' ,  marginLeft: '400px',  whiteSpace: 'nowrap'}} >Reservations</Typography>
</div>

<div className="mt-[50px]">
<section className="my-4 px-4 ml-[-100px] ">
  <div className="w-[150px] h-[150px] rounded">
      <AreaChart width={600} height={230} data={data} 
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Company" stroke="#5b21b6" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="Client" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
      </div>
      </section>
      </div>
      <div>
      <section className=" my-4 px-40 ml-[350px] mt-[-180px]">
  <div className="w-[200px] h-[200px] bg-gray-700 rounded">
    
  <BarChart width={600} height={250} data={bar}>
        <XAxis dataKey="company" />
        <YAxis />
        <Tooltip />
        <Legend />
        
        <Bar dataKey="cars" fill="#8b5cf6" />
      </BarChart>
    






  </div>
</section>
</div>


</div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default dashboard;
