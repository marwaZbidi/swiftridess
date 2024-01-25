"use client"
import React, { useState , useEffect , useRef } from "react";
import { List, ListItem, ListItemIcon, ListItemText,Menu,Typography } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import axios from "axios";
import Link from 'next/link';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import ChatIcon from '@mui/icons-material/Chat';
interface MenuItem {
  title: string;
  path: string;
}
interface obj {
  fullName:string;
  image_user:string;
}

interface User{
 
    id: number;
    fullName: string;
    image_user: string;
}

const Sidebar: React.FC <{}>= () => {
  const [state, setState] = useState(false);
  const [person,setPerson] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fullName,setfullName]=useState<string>("")
  const [image_user,setimage_user]=useState<string>("")
  const [show,setShow] = useState<boolean>(true)
  const profileRef = useRef<HTMLButtonElement>(null);
  let id= typeof window !== 'undefined' ? localStorage.getItem("id"): null;



useEffect(() => {
  const getOne = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${id}`)
      setPerson(response.data);
      console.log("eya",response.data);
      
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  getOne();
}, []);


  const navigation: MenuItem[] = [
    { title: "View Profile", path: "/admin/profile" }
];




  useEffect(() => {
      const handleDropDown = (e: MouseEvent) => {
          if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
              setState(false);
          }
      };
      document.addEventListener('click', handleDropDown);
      return () => {
          document.removeEventListener('click', handleDropDown);
      };
  }, []);
  return (
    <div className=" fixed top-0 buttom-0 flex h-screen ">
      {/* Sidebar */}
      <div className={`col-span-3 bg-gray-800 text-white px-7 py-7 ${!show?'w-[100px]':'w-[250px]'}`}>
      <List className={`flex  flex-col px-4 py-2 hover:bg-gray-1000 ${!show ? 'w-40' : ''}`}>

        <div className={`flex ${show?'ml-[170px]':'ml-[10px]'}`}>
 
  <button onClick={()=>setShow(!show)}>
  <MenuOutlinedIcon />
  </button>
</div>
          <ListItem  className="flex items-center flex-col px-4 py-2 hover:bg-gray-1000" >
 {show &&
                  <div>
                  <div className="flex items-center space-x-4">
            <button ref={profileRef} className="w-24 h-24 outline-none rounded-full ring-offset-2 ring-gray-100 ring-2 lg:focus:ring-indigo-600"
                onClick={() => setState(!state)}>
{!id?<img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
className="w-full h-full rounded-full" />:<img
                        src={person?.image_user||"https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"}
                       className="w-full h-full rounded-full"
                        alt="Profile"

                    />}
            </button>


        </div>
                 
            
            <ul className={`bg-grey top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
                {   
                    navigation.map((item, idx) => (
                        <li key={idx}>
                            <a className="block text-black-600 lg:hover:bg-gray-50 lg:p-2.5" href={item.path}>
                                {item.title}
                            </a>
                        </li>
                    ))
                }
            </ul>
            <ListItemText 
            primary={<p className="mt-2"></p>} />
            </div>   
}         
</ListItem>

<div className="mt-[50px]">
          <ListItem>
            <ListItemIcon>
              <HomeOutlinedIcon color="primary" className="hover:bg-gray-300 hover:bg-opacity-50"/>
            </ListItemIcon>
            <Link href={'/admin/dashboard'} ><button > <ListItemText primary={show&&<p>Dashboard</p>}/></button></Link>
          </ListItem>

            <ListItem button >
            <ListItemIcon >
              <GroupOutlinedIcon color="primary" className="hover:bg-gray-300 hover:bg-opacity-50"/>
            </ListItemIcon>
            <Link href={'/admin/client'}  ><button > <ListItemText  primary={show&&<p>Clients</p>}/></button></Link>
          </ListItem>
          <ListItem button >
            <ListItemIcon >
              <ContactMailOutlinedIcon color="primary"className="hover:bg-gray-300 hover:bg-opacity-50"/>
            </ListItemIcon>
            <Link href={'/admin/company'} ><button > <ListItemText primary={show&&<p>Companies</p>} /></button></Link>
          </ListItem>

            <ListItem button>
            <ListItemIcon>
              <AccountCircleOutlinedIcon color="primary" className="hover:bg-gray-300 hover:bg-opacity-50"/>
            </ListItemIcon>
            
            <Link href={'/admin/profile'} ><button > <ListItemText primary={show&&<p>Profile</p>}/></button></Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EventOutlinedIcon color="primary" className="hover:bg-gray-300 hover:bg-opacity-50"/>
            </ListItemIcon>
            <Link href={'/admin/calendar'} ><button ><ListItemText primary={show&&<p>Calendar</p>} /></button></Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ChatIcon color="primary" className="hover:bg-gray-300 hover:bg-opacity-50"/>
            </ListItemIcon>
            <Link href={'/admin/chat'} ><button > <ListItemText primary={show&&<p>Chat</p>} /></button></Link>
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <BarChartOutlinedIcon color="primary"className="hover:bg-gray-300 hover:bg-opacity-50"/>
            </ListItemIcon>
            <Link href={'/admin/BarChart'}  ><button >  <ListItemText primary={show&&<p>Sales by Year</p>} /></button></Link>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DonutSmallIcon color="primary" className="hover:bg-gray-300 hover:bg-opacity-50"/>
            </ListItemIcon>
            <Link href={'/admin/Polar'} ><button > <ListItemText primary={show&&<p>Top Cars</p>} /></button></Link>
          </ListItem>

          </div>
          </List>
      </div>

      


    </div>
  );
};

export default Sidebar;
