import React, {useState} from 'react'
import axios from 'axios';

function Product({_id,id,price,image,title}) {
    const [cartItemQuantity,setCartItemQuantity] = useState(0)
    const [isAddtoCart,setIsAddToCart] = useState(false)
    function handleAddToCart(){
      if(!isAddtoCart){
        setIsAddToCart(true)
        setCartItemQuantity(1)
      }
      else{
        if(cartItemQuantity>0){
          axios.post("http://localhost:8000/api/v1/cart/additem",{productId:_id,quantity:cartItemQuantity},{withCredentials:true})
          .then(res=>{setCartItemQuantity(0)
          setIsAddToCart(prev=>!prev)})
          .catch((error)=>{
            throw new Error(error)
          })
        }
      }
       }
       function plus(){
        setCartItemQuantity(prev => prev+1)
       }
       function minus(){
        if(cartItemQuantity==1){
          setIsAddToCart(false)
        }
          setCartItemQuantity(prev =>prev-1)
       }
    return (
        <>
          <div className="productcontainar" key={id}>
            <div onClick={() => setId([price, title, image])}>
              <img src={image} alt="" />
            </div>
            <div className="description">
              <h5>{title}</h5>
              <h5>RS : {price}</h5>
            </div>
            <button onClick={handleAddToCart}>
              add to cart
            </button>

            {cartItemQuantity >0 && <button onClick={()=>{minus()}}>-</button>}
            {cartItemQuantity> 0 && <>({cartItemQuantity})</>}
            {cartItemQuantity >0 && <button onClick={plus}>+</button>}
            
          </div>
        </>
      );
}

export default Product