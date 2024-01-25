"use client "
import React,{useState,useEffect} from 'react'
import Sidebar from '../sidebar/page'
import axios from 'axios'

interface Feedback {

}
const feedback :React.FC = () => {
const [comment,setComment] = useState<Feedback[]>([])
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string>("");

  useEffect(() => {
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

    fetch();
  }, []);
  return (
        <div className="flex h-screen">
    <Sidebar/>
       {/* Main Content */}
       <div className="flex-1 bg-gray-100 p-4 ml-[350px]">

        </div>
       </div>
  )
}

export default feedback;