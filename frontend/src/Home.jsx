import React, { useEffect, useState } from "react";
import './header.css'
import f1 from "./Images/f1.png";
import f2 from "./Images/f2.png";
import f3 from "./Images/f3.png";
import f4 from "./Images/f4.png";
import f5 from "./Images/f5.png";
import f6 from "./Images/f6.png";
import model1 from "./Images/model1.png";

import { useContext } from "react";
import Product from "./components/Product";
import ItemContext from "./ItemContext";
import {Navigate} from "react-router-dom"
import axios from "axios";

function Home() {
  const {isLoggedIn } = useContext(ItemContext);
  const [Productitem,setProductitem] = useState(null)
  if(!isLoggedIn){
    return <Navigate to="/Login" state={{component:"Home"}} />
  }
  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/cart/products",{withCredentials:true})
    .then(res=>setProductitem(res.data.data))
    .catch((error)=>{
      throw new Error
    })
   }, [])
   const limitedItems = Productitem?Productitem.slice(0, 3):null
  return (
    <>
      <section id="hero">
        <div className="heroheadings">
          <h4>don't miss the offer</h4>
          <h2>super value deals on</h2>
          <h1>all products</h1>
          <p>save mote with coupons & up to 70% off !</p>
          <button>shop now</button>
        </div>
        <div className="heroimage">
          <img src={model1} alt="fashion icon" onClick={()=>(redirect("/login"))}/>
        </div>
      </section>


      <section id="services">
        <div
          className="serviceslogo"
        >
          <img src={f1} alt="freeshipping" />
          <h6>Free Shipping</h6>
        </div>
        <div className="serviceslogo">
          <img src={f2} alt="onlineorders" />
          <h6>Online orders</h6>
        </div>
        <div className="serviceslogo">
          <img src={f3} alt="savemoney" />
          <h6>save money</h6>
        </div>
        <div className="serviceslogo">
          <img src={f4} alt="promotions" />
          <h6>promotions</h6>
        </div>
        <div className="serviceslogo">
          <img src={f5} alt="happysell" />
          <h6>happy sell</h6>
        </div>
        <div className="serviceslogo">
          <img src={f6} alt="customersupport" />
          <h6>24/7 customer support</h6>
        </div>
      </section>

      <div id="products">
        <h1 className="featuredproductsheading">featured products</h1>
        <p>summer collection new modern design</p>
      </div>
      <div className="productsection">
          {limitedItems ?
          limitedItems.map((item) => {
            const { _id,id, title, image, price } = item;
            return (
                <Product _id={_id} id={id} title={title} image={image} price={price} key={_id} />
            );
          }):""}
      </div>
    </>
  );
}

export default Home;
