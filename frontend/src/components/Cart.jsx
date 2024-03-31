import React, { useContext, useState,useEffect } from 'react'
import ItemContext from '../ItemContext'
import CartItem  from './CartItem'
import '../header.css'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios"

function Cart() {
    const {isLoggedIn}=useContext(ItemContext)
    const [cartData,setCartData] = useState([])
    const [totalAmount,setTotalAmount] = useState(0)
    const [isChanged,setIsChanged] = useState(false)
    if(!isLoggedIn){
      return <Navigate to="/" state={{component:"Cart"}} />
     }
     useEffect(() => {
      axios.get("http://localhost:8000/api/v1/cart/cart",{withCredentials:true})
      .then(res=>{
        setTotalAmount(res.data.data[0]?.totalAmount)
        setCartData((res.data.data[0]?.products)?res.data.data[0]?.products:[])})
      .catch((error)=>{throw new Error(error)})
     }, [isChanged])
  return (
    <>
      <div>
        {console.log(cartData)}
       {cartData.length >0 && <h1 style={{textAlign:'center', padding:'40px 0 0 0', color:'#088178',marginBottom:'30px'}}>your cart items</h1>}
      </div>
      <div>
        {cartData.length>0 && cartData.map((product)=>{
            
                return(
                    <CartItem key={product._id} _id={product._id} id={product.id} title={product.title} image={product.image} price={product.price} description={product.description} quantity={product.quantity} setIsChanged={setIsChanged}/>
                )
            
        })}
      </div>
      {
        totalAmount>0 ? 
        <div className='cartbuttons'> 
            <h3>subtotal : {totalAmount}</h3>
            <button>Continue shopping</button>
            <button >Checkout</button>
        </div>
        : <h1 style={{textAlign:'center', padding:'40px 0 0 0', color:'#088178', marginBottom:'40px'}}>your cart is empty</h1>
      }
    </>
  )
}

export default Cart
