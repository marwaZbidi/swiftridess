"use client"
import React , {useState,useRef} from "react"
import Sidebar from "../sidebar/page"

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import "./profile.module.css"
import axios from "axios";
import { useParams } from "next/navigation";
import bcrypt from "bcryptjs"


interface New {
    id:string|null;
    fullName:string;
    phoneNumber:number;
    email:string;
    password:string;
    image_user:String;
}

const profile:React.FC  = ()=>{
const [fullName,setfullName]=useState<string>("")
const [phoneNumber,setPhoneNumber]=useState<number>(0)
const [email,setEmail]=useState<string>("")
const [newPassword, setNewPassword] = useState<string>("")
const [password,setPassword]=useState<string>("")
const [image_user,setimage_user]=useState<string>("")
const [previewImage, setPreviewImage] = useState<string>("");
const [hashedNewPassword,setHashedNewPassword] = useState<string>("");
const fileInputRef = useRef<HTMLInputElement>(null); 
const userId = typeof window !== 'undefined' ? localStorage.getItem("id"): null;



    
const addPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'pa4ezjqw');

      axios
        .post("http://api.cloudinary.com/v1_1/dfsyqvvim/image/upload", formData)
        .then((res) => {
          console.log('secure', res.data.secure_url);
          setimage_user(res.data.secure_url);
          setPreviewImage(res.data.secure_url);
          console.log('url', image_user);
        })
        .catch((err) => {
          console.log(formData);
          console.log(err);
        });
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const modifyProfile = async (user: New) => {
    try {
      let i = await bcrypt.hash(newPassword, 10);
        setHashedNewPassword(i) 

      const updatedUser = {
        ...user,
        newPassword: hashedNewPassword,
        image_user: image_user,
      };

      const response = await axios.put(`http://localhost:3000/api/users/${userId}`, updatedUser);
      

      console.log(response.data, 'res');
      alert('You successfully updated your account');
    } catch (error) {
      console.error(error);
    }
  };

    return (
      <div className="flex h-screen">
      <Sidebar/>
   
         {/* Main Content */}
         <div className="flex-1 bg-gray-100 p-4 ml-[350px]">
         {/* Your main content goes here */}
         <div>
         
         <div >
      <div
        className="absolute top-[-10rem] sm:top-[-20rem]"
        aria-hidden="true"
      >

      </div>
      <div className="mx-auto max-w-2xl text-center">
        
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Update your profile</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Admin space 
        </p>
      </div>
                
<div className="max-h-screen  items-center  w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] mr-[200px]">
        <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <div className="p-4 py-6  md:flex md:flex-col mt-[100px] ">
                    <div className="flex flex-col md:flex-row md:flex-1 ml-[-200px]">
                        <img className="object-cover bg-blue w-[400px] h-[545px] mt-[-72px] "
                            src={previewImage}
                            alt=""/>
                            </div>
                        <div className="flex flex-row space-y-5 ml-[-200px]">
                            <button type="button" 
                                className="text-white py-3.5 w-[400px] px-7 text-base font-medium text-bg-gray-600 focus:outline-none bg-slate border border-bg-gray-600 hover:bg-gray-600 focus:z-10 focus:ring-4 focus:ring-bg-gray-600 "
                                onClick={handleButtonClick}>
                                Change picture
                            </button>
                            <input 
                             ref={fileInputRef}
                             type="file" 
                             className="hidden"
                             onChange={(e) =>{ addPicture(e) }} 
                             />                        
                        </div>
                    </div>

                 </div>
               </div>
               </div>
<div>
           <div className="items-center ml-28 text-[#202142]">
      <form action="#" method="POST" className="mx-auto mt-16  max-w-xl sm:mt-20">
        <div className=" grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 ml-[100px] mt-[-700px]">
          <div className="sm:col-span-2">
            <label htmlFor="first-name" 
            className="block text-sm font-semibold leading-6 text-gray-900">
              Full name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="fullname"
                id="fullname"
                autoComplete="fullname"
                className="block w-full border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e)=>setfullName(e.target.value)} />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
            email
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e)=>setEmail(e.target.value)} />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="longitude" className="block text-sm font-semibold leading-6 text-gray-900">
              current password
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="password"
                className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e)=>setPassword(e.target.value)} />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="longitude" className="block text-sm font-semibold leading-6 text-gray-900">
             new password
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="password"
                className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e)=>setNewPassword(e.target.value)} />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
              Phone number
            </label>
            <div className="relative mt-2.5">
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                autoComplete="tel"
                className="block w-full border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e)=>setPhoneNumber(+e.target.value)}/>
            </div>
          </div>




        </div>
        <div className="mt-[28px] ml-[100px]">
          <button
            type="submit"
            className=" block w-full text-white py-3.5  px-7 text-base font-medium text-bg-gray-600 focus:outline-none bg-slate border border-bg-gray-600 hover:bg-gray-600 focus:z-10 focus:ring-4 focus:ring-bg-gray-600 "            
             onClick={()=>{ modifyProfile({id:userId,fullName:fullName,image_user:image_user,phoneNumber:phoneNumber,email:email,password:newPassword})}}>
            Done
            {/* <Link href={{ pathname: '/admin/sidebar', query: {  fullName:fullName,image_user:image_user } }}></Link> */}
          </button>
          
        </div>  
      </form>
    </div>
    </div>
  </div>
</div>
</div>
      </div> 

    )
}
export default profile;