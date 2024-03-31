import React, { useEffect, useState, useContext } from 'react';
import { useNavigate ,useLocation } from 'react-router-dom';
import axios from 'axios';
import ItemContext from '../ItemContext';
import '../login.css'

function Login() {
  const navigateto = useNavigate();
  const location = useLocation()
  const {component} = location.state || {}
  const [leftPanel, setLeftPanel] = useState(true);
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(ItemContext);
  const [loginCred, setLoginCred] = useState({
    username: '',
    password: '',
  });
  const [signupCred, setSignupCred] = useState({
    username:'',
    email:'',
    password:''
  });

// getting cookies from the browser
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
  const accessToken = cookies['accessToken'];
  const refreshToken = cookies['refreshToken'];

  //handling the change of input fields of login and signup
  const handleLoginChange = (e) => {
    setLoginCred({
      ...loginCred,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignupChange = (e) => {
    setSignupCred({
      ...signupCred,
      [e.target.name]: e.target.value,
    });
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      console.log("trying")
      const response = await axios.post('http://localhost:8000/api/v1/users/login', loginCred, {
        withCredentials: true,
      });
      console.log("tried")
      if (!response.data.success) {
        console.log('error');
        loginCred.username = ""
        loginCred.password = ""
        throw new Error('Login unsuccessful');
      }
      console.log(response)
      setUser(response.data.data);
      setIsLoggedIn(true);
      navigateto("/Home")
    } catch (error) {
      console.log('error', error);
    }
  }
  async function handleSignup(e){
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/register",signupCred,{withCredentials:true})
      if(!response.data.success){
        console.log('error');
        throw new Error('Signup unsuccessful');
      }
      setUser(response.data.data);
      setIsLoggedIn(true);
      navigateto("/Home")
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
      <div className='bodyy'>
        <div className='container'>
      <div className='leftblock'>
        {  leftPanel  ?  
         <form onSubmit={handleLogin}>
          <h1>SignIn</h1>
          <input type="text" placeholder='Username or Email' name='username' value={loginCred.username} onChange={handleLoginChange} />
          <input type="text" placeholder='Password' name='password' value={loginCred.password} onChange={handleLoginChange} />
          <a href="#">Forgot Password?</a>
          <button className='login-form-button' onClick={handleLogin}>SignIn</button>
        </form>
        :
        <div className='content1'>
          <h1>Welcome Back</h1>
          <p>To keep connected with people please login with your personal info</p>
          <button className='login-form-button' onClick={()=>{setLeftPanel(true)}}>SignIn</button>
        </div>
        }
      </div>
      <div className='rightblock'>
        {   leftPanel ?
         <div className={leftPanel?'content2':""}>
          <h1>Hello Friend!</h1>
          <p>Enter your details and start your journey with us</p>
          <button className='login-form-button' onClick={()=>{setLeftPanel(false)}}>SignUp</button>
         </div>
        :
        <div className='signup_container'>
            <form onSubmit={handleSignup}>
            <h1>Create Account</h1>
            <span>Use your mail for registration</span>
            <input type="text" placeholder='username' name='username' value={signupCred.username} onChange={handleSignupChange} />
            <input type="text"  placeholder='email' name='email' value={signupCred.email} onChange={handleSignupChange} />
            <input type="text" placeholder='password' name='password' value={signupCred.password} onChange={handleSignupChange} />
            <button className='login-form-button'>SignUp</button>
         </form>
        </div> }
      </div>
    </div>
      </div>
  );
}

export default Login;
