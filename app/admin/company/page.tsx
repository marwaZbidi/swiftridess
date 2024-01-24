"use client"
import React,{useState,useEffect} from "react";
import { Typography } from "@mui/material";
import Sidebar from "../sidebar/page"
import axios from 'axios';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import SearchIcon from '@mui/icons-material/Search';

interface Company {
  idcompany: number;
  companyName: string;
  ownerName: string;
  phoneNumber: string;
  verification : number;
  longtitude:string;
  laltitude:string;
  emailCompany:string;
  PaymentVerification:boolean;
  createdAt:Number;

} 



const company:React.FC =()=>{
  const [companyData, setCompanyData] = useState<Company[]| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searched,setSearched]=useState<string>("");



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/company/getAll');
console.log(response.data);

        setCompanyData(response.data);
      } catch (error) {
        console.log(error);
        
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteCompany = async (id:number) => {
    
    try {
      await fetch(`http://localhost:3000/api/company/${id}`, {
        method: 'DELETE',
      });
      console.log("user deleted");
    } catch (error) {
      console.error("delete category:", error);
    }
  };

  const search = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/company/getbyName/${searched}`);

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
      }

      const searchData: Company[] = await response.json();
      setCompanyData(searchData);
      console.log("found", searchData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(event.target.value);
  };
    return (
        <div className="flex h-screen">
        <Sidebar/>
     
           {/* Main Content */}
           <div className="flex-1 bg-gray-100 p-4 ml-[350px]">
           {/* Your main content goes here */}
           <div>

<div className="mb-4 ml-[800px]">
              <input
                type="text"
                placeholder="Search ...."
                value={searched}
                onChange={handleSearchChange}
                className="p-2 border border-gray-300 rounded-md"
              />
              <button onClick={search} className=" p-2 bg-blue-500 text-black rounded-md">
              <SearchIcon />
              </button>
            </div>
           <Typography variant="h2" fontWeight="bold" style={{ color: '#000080' }}>
           List of companies
           </Typography>
           

           
           <div className="companies-container">
           
          <div className="com-box">


<div className="absolute -ml-[60px] mt-10 overflow-x-auto shadow-md sm:rounded-lg w-[1100px]">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
            
                </th>
                <th scope="col" className="px-4 py-2">
                    id
                </th>
                <th scope="col" className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Company Name 
                </th>
                <th scope="col" className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Owner name 
                </th>
                <th scope="col" className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Email 
                </th>

                <th scope="col" className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Phone Number 
                </th>

                <th scope="col" className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Longtitude 
                </th>
                <th scope="col" className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Latitude
                </th>
                <th scope="col" className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    Verification
                </th>

            </tr>
        </thead>
        <tbody>
        {companyData && companyData.map((e,i) => (
            <tr key={i}>
  <span className="slider round"></span>
                <td scope="col" className="px-4 py-2">
                   {e.idcompany}
                </td>
                <td scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                {e.companyName}
                </td>
                <td scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                {e.ownerName}
                </td>
                <td className="px-6 py-4 text-black ">
                {e.emailCompany}
                </td>

                <td className="px-4 py-2">
                {e.phoneNumber}
                </td>
                <td className="px-4 py-2 text-black ">
                {e.longtitude}
                </td>
                <td className="px-4 py-2 text-black ">
                {e.laltitude}
                </td>
                <td className="flex items-center px-4 py-2"> {e.verification}
                <button  onClick={() => { deleteCompany(e.idcompany) }}>   
                <a href="#" className="font-medium text-red-600 dark:text-black hover:underline ms-3"><RestoreFromTrashIcon style={{ color: 'red' }}/></a>
                </button> 
                </td>

            </tr>
              ))}
            </tbody>
        
                </table>
                </div>
                </div>
      
      </div>
      </div>
           </div>

           </div>
    )
}
export default company;


