import React, { useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'

function CartItem({_id,id,title,image,price,description,quantity,setIsChanged}) {
    const [itemQuantity,setItemQuantity] =useState(quantity)  
    function minus(){
      axios.post("http://localhost:8000/api/v1/cart/deleteitem",{productId:_id,quantity:1},{withCredentials:true})
      .then(res=>{
        setIsChanged(prev => !prev)
        setItemQuantity(prev=>prev-1)
      })
      .catch((error)=>{throw new Error(error)})
    }
    function plus(){
      axios.post("http://localhost:8000/api/v1/cart/additem",{productId:_id,quantity:1 },{withCredentials:true})
      .then(res=>{
        setIsChanged(prev => !prev)
        setItemQuantity(prev=>prev+1)
      })
      .catch((error)=>{throw new Error(error)})
    }
  return (
    <div style={{display:'flex', gap:'30px', margin:'0px 40px 10px 40px',  padding:'20px 60px', border:'2px solid #c7897b',borderRadius:'20px'}}>
      <div style={{width:'15%'}}>
        <img style={{width:'100%'}}  src={image} alt="" />  
      </div>
      <div>
        <h2 style={{margin:'5px 0'}}>{title}</h2>
        <p style={{margin:'2px 0'}}>
          <span style={{fontWeight:"bold"}}>Description </span>: {description}
        </p>
        <h3 style={{margin:'5px'}}>Price : {price}</h3>
        <div>
        <button style={{width:'30px', height:'30px', marginRight:'10px'}}   onClick={minus}> - </button>
        <input style={{width:'50px', height:'30px'}}  type="text" value={itemQuantity} readOnly/>
        <button style={{width:'30px', height:'30px', marginLeft:'10px'}}   onClick={plus}> + </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
