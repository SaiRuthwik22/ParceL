import React, { useContext } from "react";
import "./header.css";
import f1 from "./Images/f1.png";
import f2 from "./Images/f2.png";
import f3 from "./Images/f3.png";
import f4 from "./Images/f4.png";
import f5 from "./Images/f5.png";
import f6 from "./Images/f6.png";
import video from "./Images/1.mp4";
import a6 from './Images/a6.jpg'
import ItemContext from "./ItemContext";
import { Navigate } from "react-router";

function About() {
  const{isLoggedIn}=useContext(ItemContext)
  if(!isLoggedIn){
    return <Navigate to="/" state={{component:"About"}} />
   }
  return (
    <>
      <section id="about-head">
        <img src={a6} alt="" />
        <div>
          <h2>who we are?</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus ipsa, nam sequi tempore, repellendus quis quaerat iste
            veniam adipisci, accusamus reprehenderit. Odio praesentium, saepe
            minima voluptatum natus aspernatur voluptates exercitationem culpa!
            Voluptatibus porro ipsa earum enim veniam laborum, ipsam tempora nam
            dolorem eligendi minima qui sit. Nostrum minima iure
            expedita.lorem10
          </p>
          <abbr title="">
            create stunning images with as much or as little control as you like
            thanks to choice of Basic and Creative modes.
          </abbr>
          <br />
          <br />
          <marquee bgcolor="#ccc" loop="-1" scrollamout="5" width="100%">
            create stunning images with as much or as little control as you like
            thanks to a choice of basic and Creative modes.
          </marquee>
        </div>
      </section>

      <section id="about-app">
        <h1>
          Download Our <a href="#">App</a>
        </h1>
        <div className="video">
          <video src="https://res.cloudinary.com/deqnkdhag/video/upload/v1707155954/images/rcyi8i9pv0bavmpisxpp.mp4" type="video/mp4" controls></video>
        </div>
      </section>

      <section id="services">
        <div
          className="serviceslogo"
          onClick={()=>"window.location.href='sproducts.html'"}
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
    </>
  );
}

export default About;
