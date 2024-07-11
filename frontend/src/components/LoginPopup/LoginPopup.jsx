import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin, setToken, loadCartData }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };
 

  const onLogin = async (e) => {
    e.preventDefault();

    const baseURL = "http://localhost:4000";  // Replace with your server URL
    let new_url = baseURL;
    if (currState === "Login") {
      new_url += "/api/user/login";
    } else {
      new_url += "/api/user/register";
    }

    try {
      const response = await axios.post(new_url, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        loadCartData({ token: response.data.token });
        setShowLogin(true);  // Close the popup upon successful login
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        // The request was made and the server responded with a status code
        toast.error(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from server. Please check your network or server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className='login-popup'>
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>
        <form onSubmit={onLogin} className="login-popup-form">
          <div className="login-popup-inputs">
            {currState === "Sign Up" && <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' />}
            <input name='email' onChange={onChangeHandler} type="email" value={data.email} placeholder='Your email' />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' />
          </div>
          <button type="submit">{currState === "Login" ? "Login" : "Create account"}</button>
        </form>
        <div className="login-popup-condition">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
        }
      </div>
    </div>
  );
};

export default LoginPopup;
