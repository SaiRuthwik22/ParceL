import React, { useState,useEffect ,useContext} from "react";
import ItemContext from "../ItemContext";
import '../header.css';
import { Navigate } from "react-router";
import axios from "axios";
import Product from "./Product";

 function Shop() {
  const { isLoggedIn} = useContext(ItemContext);
  const [Productitem,setProductitem] = useState(null)
  if(!isLoggedIn){
    return <Navigate to="/" state={{component:"Shop"}}/>
   }
   useEffect(() => {
    axios.get("http://localhost:8000/api/v1/cart/products",{withCredentials:true})
    .then(res=>setProductitem(res.data.data))
    .catch((error)=>{
      throw new Error
    })
   }, [])


  return (
    <>
      <h1 style={{textAlign:'center', padding:'40px 0 0 0', color:'#088178'}}>Our Collection</h1>
      <div className="productsection">
          {Productitem ? Productitem.map((item) => {
            const { _id,id, title, image, price } = item;
            return(<Product _id={_id} id={id} title={title} image={image} price={price} key={_id} />)
          }):""}
      </div>
    </>
  );
}

export default Shop;