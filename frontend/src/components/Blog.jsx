import React from "react";
import ItemContext from "../ItemContext";
import '../header.css'
import b1 from "../Images/b1.jpg"
import b2 from "../Images/b2.jpg"
import b3 from "../Images/b3.jpg"
import b4 from "../Images/b4 (1).jpg"
import b5 from "../Images/b5 (1).jpg"
import b6 from "../Images/b6.jpg"
import { Navigate } from "react-router";



function Blog() {
  const{isLoggedIn}=React.useContext(ItemContext)
  if(!isLoggedIn){
    return <Navigate to="/" state={{component:"Blog"}} />
   }
  return (
    <>
       <h1 style={{textAlign:'center', padding:'40px 0 0 0', color:'#088178'}}>Our Blogs</h1>
      <div id="blogsection">
        <div className="blog-box">
          <div className="blog-img">
            <img src={b1} alt="" />
          </div>
          <div className="blog-details">
            <h4>the cotton jersy Zip-Up Hoodie</h4>
            <p>
              This hoodie is made from pure cotton fabric, with a soft brushed
              inner lining for maximum comfort. Regular fit, with a classNameic
              drawstring neck, handy pockets and zip-through front. Ribbed cuffs
              and waistband ensure a snug feel.
            </p>
            <a href="#">CONTINUE READING-------</a>
          </div>
        </div>

        <div className="blog-box">
          <div className="blog-img">
            <img src={b2} alt="" />
          </div>
          <div className="blog-details">
            <h4>the cotton jersy Zip-Up Hoodie</h4>
            <p>
              This hoodie is made from pure cotton fabric, with a soft brushed
              inner lining for maximum comfort. Regular fit, with a classNameic
              drawstring neck, handy pockets and zip-through front. Ribbed cuffs
              and waistband ensure a snug feel.
            </p>
            <a href="#">CONTINUE READING-------</a>
          </div>
        </div>

        <div className="blog-box">
          <div className="blog-img">
            <img src={b3} alt="" />
          </div>
          <div className="blog-details">
            <h4>the cotton jersy Zip-Up Hoodie</h4>
            <p>
              This hoodie is made from pure cotton fabric, with a soft brushed
              inner lining for maximum comfort. Regular fit, with a classNameic
              drawstring neck, handy pockets and zip-through front. Ribbed cuffs
              and waistband ensure a snug feel.
            </p>
            <a href="#">CONTINUE READING-------</a>
          </div>
        </div>

        <div className="blog-box">
          <div className="blog-img">
            <img src={b4} alt="" />
          </div>
          <div className="blog-details">
            <h4>the cotton jersy Zip-Up Hoodie</h4>
            <p>
              This hoodie is made from pure cotton fabric, with a soft brushed
              inner lining for maximum comfort. Regular fit, with a classNameic
              drawstring neck, handy pockets and zip-through front. Ribbed cuffs
              and waistband ensure a snug feel.
            </p>
            <a href="#">CONTINUE READING-------</a>
          </div>
        </div>

        <div className="blog-box">
          <div className="blog-img">
            <img src={b5} alt="" />
          </div>
          <div className="blog-details">
            <h4>the cotton jersy Zip-Up Hoodie</h4>
            <p>
              This hoodie is made from pure cotton fabric, with a soft brushed
              inner lining for maximum comfort. Regular fit, with a classNameic
              drawstring neck, handy pockets and zip-through front. Ribbed cuffs
              and waistband ensure a snug feel.
            </p>
            <a href="#">CONTINUE READING-------</a>
          </div>
        </div>

        <div className="blog-box">
          <div className="blog-img">
            <img src={b6} alt="" />
          </div>
          <div className="blog-details">
            <h4>the cotton jersy Zip-Up Hoodie</h4>
            <p>
              This hoodie is made from pure cotton fabric, with a soft brushed
              inner lining for maximum comfort. Regular fit, with a classNameic
              drawstring neck, handy pockets and zip-through front. Ribbed cuffs
              and waistband ensure a snug feel.
            </p>
            <a href="#">CONTINUE READING-------</a>
          </div>
        </div>
      </div>

    </>
  );
}

export default Blog;
