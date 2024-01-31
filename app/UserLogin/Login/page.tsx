"use client";
import React, { useState } from 'react';
import './login.css';
import Link from 'next/link';
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha'; 
import { SocialIcon } from 'react-social-icons'

const Login = () => {
  const { push } = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<string>('');

  const ErrNotif = () => toast.error('Please check your information!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const handleVerifyCaptcha = (token: string | null) => {
    if (token) {
      setCaptchaToken(token); 
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Invalid email or password');
      ErrNotif();
      return;
    }

    if (!captchaToken) {
      setError('Please complete the CAPTCHA verification');
      ErrNotif();
      return;
    }

    try {
      const logUser = await axios.post("http://localhost:3000/api/login/user", { email, password, captchaToken });
      localStorage.setItem('id', logUser.data.id);

      if (logUser.data.role === "client") {
        push("/Home");
      }
      if (logUser.data.role === "admin") {
        push("/admin/dashboard");
      }
      ErrNotif();
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
    }
  };

  const getUserIdFromLocalStorage = () => {
    const storeduserId = localStorage.getItem('id');
    if (storeduserId) {
      setUserId(storeduserId);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen '>
      <div className="video-background ">
        <video src={process.env.PUBLIC_URL + "/assets/video3.mp4"} loop autoPlay muted className='object-cover absolute h-screen w-screen -z-10 top-0 left-0'></video>
      </div>
      <ToastContainer />
      <div className="container" >
        <form onSubmit={handleSubmit} >
          <div className="card mx-auto">
            <a className="login">Log in</a>
            <div className="social-icons">
              <SocialIcon url="https://twitter.com" style={{ marginRight: '30px' }} />
              <SocialIcon url="https://facebook.com" style={{ marginRight: '30px' }}  />
              <SocialIcon url="https://email.com" style={{ marginRight: '30px' }}/>
              <SocialIcon url="https://instagram.com" />

            </div>
            <div className="inputBox">
              <input type="text" required={true}
                value={email}
                onChange={(e) => { setEmail(e.target.value) }} />
              <span className="user">email</span>
            </div>

            <div className="inputBox">
              <input type="password" required={true}
                value={password}
                onChange={(e) => { setPassword(e.target.value) }} />
              <span>Password</span>
            </div>

            <ReCAPTCHA
              sitekey="6LeUe2EpAAAAALAPrADf3KVDv2jozaWk962XdBAf"
              onChange={handleVerifyCaptcha}
              theme="dark" 
              />

            <button className="enter" onClick={() => { getUserIdFromLocalStorage() }} >Log In</button>
            <div className='flex text-sm mt-3 text-white'>
              <h1 className='-mt-6 mb-4  '>Already have account  ?  </h1> <Link className='-mt-6 ' href={'/UserLogin/SignUp'}><span className='underline  cursor-pointer'>  Register Now</span></Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
