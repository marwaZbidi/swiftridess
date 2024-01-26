"use client"
import React,{useState,useEffect} from 'react'
import Sidebar from '../sidebar/page'
import axios from 'axios'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import "./style.css";

interface Feedback {
  idfeedback: number;
  clientImageUser: string;
  clientFullName: string;
  content: string;
}
const feedback :React.FC = () => {
const [comment,setComment] = useState<Feedback[]>([])
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string>("");

 
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/feedback');
console.log("eee",response.data);

        setComment(response.data);
      } catch (error) {
        console.log(error);
        
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

const removeFeedback = (idfeedback:number) => {
  try {
  axios.delete(`http://localhost:3000/api/user/feedback/remove/${idfeedback}`)
  }catch(err) {console.log(err)}
  location.reload();
}



useEffect(() => {
  
fetch();
}, []);
  return (
        <div className="flex h-screen">
    <Sidebar/>
       {/* Main Content */}
       <div className="flex-1 bg-gray-100 p-4 ml-[350px]">
        <h1 className='text-center text-[50px]'>              Clients FeedBack
</h1>



<div  className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>
{ comment.map((e,i) => (
 <div className="card">
      
      <div className="profile-pic">
          
      <img src={e.clientImageUser}/>
      </div>
      <div className="bottom">
          <div className="content">
              <span className="name">{e.clientFullName}</span>
              <span className="about-me">{e.content} </span>
          </div>
         <div className="bottom-bottom">
        
         
            <button className="button" onClick={() => { removeFeedback(e.idfeedback) }}><RestoreFromTrashIcon /></button>
         
         </div>
      </div>
   </div>))}
</div>


       {/* { comment.map((e,i) => (
          <div key={i}>
<ul>
  <li>FullName:{e.content}</li>
  <li>Email:{e.clientFullName}</li>


</ul>
        </div>
        ))} */}
        </div>
       </div>
  )
}

export default feedback;