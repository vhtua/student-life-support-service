import React, { useEffect } from "react";
// import $ from 'jquery';  // Import jQuery
// import { Link } from 'react-router-dom';

// Import styles sheet
import "../../../src/public/landing/assets/css/animated.css"
import "../../../src/public/landing/assets/css/fontawesome.css"
import "../../../src/public/landing/assets/css/owl.css"
import "../../../src/public/landing/assets/css/templatemo-chain-app-dev.css"
import "../../../src/public/landing/vendor/bootstrap-5.3.3/scss/bootstrap.scss" // Only using bootstrap in this local component

// Import image
import logo from "../../../src/public/landing/assets/images/vgu_logo.png"
import slider_dec from "../../../src/public/landing/assets/images/slider-dec.png"

// Custom Hooks
import useLandingCustom from "hooks/landing/useLandingCustom";



function LandingPage() {
  useLandingCustom();


  function redirectById(event, tagIdName) {
    event.preventDefault(); 
    window.location.hash = tagIdName; 
  }


    return(

  <div className="local-bootstrap">


  <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="main-nav">
            {/* <!-- ***** Logo Start ***** --> */}
            <a href="/" className="logo">
              <img className="temo"  src={logo} alt="Chain App Dev" style={{width: "80%"}}/>
            </a>
            {/* <!-- ***** Logo End ***** --> */}
            {/* <!-- ***** Menu Start ***** --> */}
            <ul className="nav">
              <li className="scroll-to-section"><a href="#home" className="active" >Home</a></li>
              <li className="scroll-to-section"><a href="#services">Services</a></li>
              {/* <li className="scroll-to-section"><a href="#about">About</a></li> */}
              {/* <li className="scroll-to-section"><a href="#pricing">Pricing</a></li> */}
              <li className="scroll-to-section"><a href="#about-us">About us</a></li>
              <li></li>
              {/* <li><div className="gradient-button"><a id="modal_trigger" target="_blank" href="/login"><i className="fas fa-sign-in-alt"></i> Sign In Now</a></div></li>  */}
            </ul>        
            <a className='menu-trigger'>
                <span>Menu</span>
            </a>
            {/* <!-- ***** Menu End ***** --> */}
          </nav>
        </div>
      </div>
    </div>
  </header>
  {/* <!-- ***** Header Area End ***** --> */}



  <div className="main-banner wow fadeIn" id="home" data-wow-duration="1s" data-wow-delay="0.5s">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="left-content show-up header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                <div className="row">
                  <div className="col-lg-12">
                    <h2>VGU Student Life Support Service</h2>
                    <p className="temo" >The VGU Student Life Support Service is an online platform designed to assist VGU students with various aspects of their daily life at the university.</p>
                  </div>
                  <div className="col-lg-12">
                    <div className="white-button first-button scroll-to-section">
                      <a target="_blank" href="/login">Sign in now<i className="fas fa-sign-in-alt"></i></a>
                    </div>
                    <div className="white-button scroll-to-section">
                      <a target="_blank" href="https://github.com/vhtua/student-life-support-service">Contribute <i className="fab fa-github"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                <img className="temo"  src={slider_dec} alt="" style={{width : "90%"}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="services" className="services section">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="section-heading  wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
            <h4>Amazing <em>Support Services</em> for students</h4>
            <img className="temo"  src="assets/images/heading-line-dec.png" alt=""/>
            <p className="temo" >Through this system, students are able to submit support tickets and await resolution. These tickets are subsequently managed by the dormitory staff and the student affairs team.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <div className="service-item first-service">
            <div className="icon"></div>
            <h4>Easy Access</h4>
            <p className="temo" >The service can be easily accessed via any smart device with internet connectivity, offering convenient and effortless usage.</p>
            {/* <div className="text-button">
              <a href="#">Read More <i className="fa fa-arrow-right"></i></a>
            </div> */}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="service-item second-service">
            <div className="icon"></div>
            <h4>Innovative features</h4>
            <p className="temo" >The service offers a wide range of innovative features, providing users with enhanced functionality and seamless performance.</p>
            {/* <div className="text-button">
              <a href="#">Read More <i className="fa fa-arrow-right"></i></a>
            </div> */}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="service-item third-service">
            <div className="icon"></div>
            <h4>Amazing GUI</h4>
            <p className="temo" >The service features an exceptional graphical user interface (GUI) that enhances user experience through intuitive design and functionality.</p>
            {/* <div className="text-button">
              <a href="#">Read More <i className="fa fa-arrow-right"></i></a>
            </div> */}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="service-item fourth-service">
            <div className="icon"></div>
            <h4>24/7 Help &amp; Support</h4>
            <p className="temo" >The VGU team will be available around the clock to provide continuous support and address any issues that may arise. </p>
            {/* <div className="text-button">
              <a href="#">Read More <i className="fa fa-arrow-right"></i></a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="about" className="about-us section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 align-self-center">
          {/* <div className="section-heading">
            <h4>About <em>What We Do</em> &amp; Who We Are</h4>
            <img className="temo"  src="assets/images/heading-line-dec.png" alt=""/>
            <p className="temo" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eismod tempor incididunt ut labore et dolore magna.</p>
          </div> */}
          <div className="row">

            <div className="col-lg-12">
              <p className="temo" >
              The service, accessible on any internet-connected smart device, offers a wide range of innovative features and an exceptional GUI for seamless performance, with 24/7 support from the VGU staff.</p>
              <div className="gradient-button">
                <a target="_blank" href="/login">Use the Service</a>
              </div>
              <span>*Only for VGU Students and Staff</span>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="right-image">
            <img className="temo"  src="assets/images/about-right-dec.png" alt=""/>
          </div>
        </div>
      </div>
    </div>
  </div>
  

  <footer id="about-us">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="section-heading">
            <h4>About us</h4>
          
            <h6 style={{textShadow: "#000 0px 0px 10px"}}>Author: Vu Hoang Tuan Anh</h6>
            <h6 style={{textShadow: "#000 0px 0px 10px"}}>Matriculation number: 18812</h6>
            <h6 style={{textShadow: "#000 0px 0px 10px"}}>Vietnamese-German University</h6>
            <h6 style={{textShadow: "#000 0px 0px 10px"}}>Frankfurt University of Applied Sciences</h6>
          </div>
          
        </div>



      </div>
      <div className="row">
       
        <div className="col-lg-12">
          <div className="copyright-text">
            <p className="temo" >Copyright © 2024 VGU Student Life Support Service. All Rights Reserved.
              <br/>
              {/* Author: Vu Hoang Tuan Anh - Matriculation number: 18812
              <br/> */}
              Source code: <a href="https://github.com/vhtua/student-life-support-service" target="_blank" title="css templates">GitHub Repository</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
              
        </div>

    );
}

export default LandingPage;