import React, { useContext, useState } from 'react'
import ItemContext from '../ItemContext'
import { Navigate } from 'react-router'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function User() {
    const {user,isLoggedIn,setIsLoggedIn,setUser} = useContext(ItemContext)
    const navigateto = useNavigate()
    console.log(isLoggedIn)
    if(!isLoggedIn){
        <Navigate to="/" state={{component:"User"}}/>
    }
    const[passwordButton,setPasswordButton] = useState(false)
    const[oldPassword,setOldPassword]= useState("")
    const [newPassword,setNewPassword] = useState("")
    const [errormsg,setErrorMsg] = useState("")

    function logout(){
        axios.post("http://localhost:8000/api/v1/users/logout",{},{withCredentials:true})
        .then((res)=>{
            if(res.data.success){
                setIsLoggedIn(false)
                setUser({})
                navigateto("/Login")

            }
        })
    }

    function changePassword(){
        if( passwordButton){
            try {
                axios.post("http://localhost:8000/api/v1/users/changepassword",{oldPassword:oldPassword,newPassword:newPassword},{withCredentials:true})
                .then(res=>{setNewPassword("")
                setOldPassword("")
                setPasswordButton(false)
                setErrorMsg("")
                console.log(res)})
                .catch((error)=>{
                    setErrorMsg("Wrong password")
                    setNewPassword("")
                    console.log(error)})
            } catch (error) {
                setErrorMsg(error)
            }
        }
        else{
            setNewPassword("")
            setOldPassword("")
            setPasswordButton(true)
        }
    }
  return (

    <>
    {  passwordButton ?
    <>
    <input type="text" placeholder='Old Password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/> 
    {errormsg&&<h4 style={{backgroundColor:"red"}}>{errormsg}</h4>}
    </>
    :  
    <div className='username'>User :{user.username}</div>}
    {passwordButton ? <input type="text" placeholder='New Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} /> :  <div className='useremail'>Email:{user.email}</div>}
    <button onClick={changePassword}>Change Password</button>
    <button onClick={logout}>Logout</button>
    </>

  )
}

export default User