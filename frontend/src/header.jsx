import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX,faBars,faCartShopping} from '@fortawesome/free-solid-svg-icons'

function Header() {


  const[active,setActive]=useState(false)

  return (
    <>
      <section id="header">
        <div className="title">
          <h1>
            <a className="style logo" href="#">
              ParceL
            </a>
          </h1>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
        <nav className={active?"navigation active":"navigation"}>
          <button id="closebtn" onClick={()=>{setActive((prev)=>!prev)}}><FontAwesomeIcon icon={faX} /></button>
          <NavLink to="/Home">
            Home
          </NavLink>
          <NavLink to="shop">
            Shop
          </NavLink>
          <NavLink to="Blog">
            Blog
          </NavLink>
          <NavLink to="About">
            About
          </NavLink>
          <NavLink to="Cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </NavLink>
          <NavLink to="User">Profile</NavLink>
        </nav>
        <div id="mobile">
          <NavLink to="Cart">
            <FontAwesomeIcon icon={faCartShopping} />
          </NavLink>
          <button id="bar" onClick={()=>{setActive((prev)=>!prev)}}><FontAwesomeIcon icon={faBars} /></button>
        </div>
      </section>
    </>
  );
}

export default Header;





































