import React from "react";


function Footer() {
  return (
    <>
      <section id="newsletter">
        <div className="newstext">
          <h4>sign up for newsletters</h4>
          <p>
            get E-mail updates about our latest shop and
            <span>special offers</span>
          </p>
        </div>
        <div className="form">
          <input type="email" placeholder="your mail address" />
          <button>signup</button>
        </div>
      </section>

      <section id="footer">
        <div className="contactsection">
          <h2>ParceL</h2>
          <h4>contact</h4>
          <p>
            <strong>Address:</strong>562 wellington Road,street 32,San Francisco
          </p>
          <p>
            <strong>Phone:</strong>+01 2222 365/(+91)01234 56789
          </p>
          <p>
            <strong>Hours:</strong>10:00-18.00,Mon-Sat
          </p>
          <div className="sociallinks">
            <h4>Follow Us</h4>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-pinterest-p"></i>
          </div>
        </div>
        <div className="aboutsection col">
          <h4>About Us</h4>
          <a>Delivery Information</a>
          <a>Privacy Policy</a>
          <a>Terms&Conditions</a>
          <a>Contact Us</a>
        </div>
        <div className="Myaccount col">
          <h4>Sign In</h4>
          <a>View Cart</a>
          <a>My Wishlist</a>
          <a>Track My Order</a>
          <a>Help</a>
        </div>
        <div className="installapp">
          <h4>Install App</h4>
          <p>From App Store or Google Play</p>
          <div className="storelogo">
            <img src="./aside/app.jpg" alt="" />
            <img src="./aside/play.jpg" alt="" />
          </div>
          <p>secured Payment gateways</p>
          <img src="./aside/pay.png" alt="" />
        </div>
      </section>
    </>
  );
}

export default Footer;
