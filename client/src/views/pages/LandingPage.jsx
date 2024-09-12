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
              {/* <div id="js-preloader" className="js-preloader">
                <div className="preloader-inner">
                <span className="dot"></span>
                <div className="dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                </div>
            </div> */}
  {/* <!-- ***** Preloader End ***** --> */}

  {/* <!-- ***** Header Area Start ***** --> */}

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
            {/* <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">Maintance Problems</a></h4>
                <p className="temo" >Lorem Ipsum Text</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">24/7 Support &amp; Help</a></h4>
                <p className="temo" >Lorem Ipsum Text</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">Fixing Issues About</a></h4>
                <p className="temo" >Lorem Ipsum Text</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-item">
                <h4><a href="#">Co. Development</a></h4>
                <p className="temo" >Lorem Ipsum Text</p>
              </div>
            </div> */}
            <div className="col-lg-12">
              <p className="temo" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eismod tempor idunte ut labore et dolore adipiscing  magna.</p>
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
  
  {/*
  <div id="clients" className="the-clients">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="section-heading">
            <h4>Check What <em>The Clients Say</em> About Our App Dev</h4>
            <img className="temo"  src="assets/images/heading-line-dec.png" alt=""/>
            <p className="temo" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eismod tempor incididunt ut labore et dolore magna.</p>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="naccs">
            <div className="grid">
              <div className="row">
                <div className="col-lg-7 align-self-center">
                  <div className="menu">
                    <div className="first-thumb active">
                      <div className="thumb">
                        <div className="row">
                          <div className="col-lg-4 col-sm-4 col-12">
                            <h4>David Martino Co</h4>
                            <span className="date">30 November 2021</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 d-none d-sm-block">
                            <span className="category">Financial Apps</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 col-12">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <span className="rating">4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="thumb">
                        <div className="row">
                          <div className="col-lg-4 col-sm-4 col-12">
                            <h4>Jake Harris Nyo</h4>
                            <span className="date">29 November 2021</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 d-none d-sm-block">
                            <span className="category">Digital Business</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 col-12">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <span className="rating">4.5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="thumb">
                        <div className="row">
                          <div className="col-lg-4 col-sm-4 col-12">
                            <h4>May Catherina</h4>
                            <span className="date">27 November 2021</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 d-none d-sm-block">
                            <span className="category">Business &amp; Economics</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 col-12">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <span className="rating">4.7</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="thumb">
                        <div className="row">
                          <div className="col-lg-4 col-sm-4 col-12">
                            <h4>Random User</h4>
                            <span className="date">24 November 2021</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 d-none d-sm-block">
                            <span className="category">New App Ecosystem</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 col-12">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <span className="rating">3.9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="last-thumb">
                      <div className="thumb">
                        <div className="row">
                          <div className="col-lg-4 col-sm-4 col-12">
                            <h4>Mark Amber Do</h4>
                            <span className="date">21 November 2021</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 d-none d-sm-block">
                            <span className="category">Web Development</span>
                          </div>
                          <div className="col-lg-4 col-sm-4 col-12">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <span className="rating">4.3</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
                <div className="col-lg-5">
                  <ul className="nacc">
                    <li className="active">
                      <div>
                        <div className="thumb">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="client-content">
                                <img className="temo"  src="assets/images/quote.png" alt=""/>
                                <p className="temo" >“Lorem ipsum dolor sit amet, consectetur adpiscing elit, sed do eismod tempor idunte ut labore et dolore magna aliqua darwin kengan
                                  lorem ipsum dolor sit amet, consectetur picing elit massive big blasta.”</p>
                              </div>
                              <div className="down-content">
                                <img className="temo"  src="assets/images/client-image.jpg" alt=""/>
                                <div className="right-content">
                                  <h4>David Martino</h4>
                                  <span>CEO of David Company</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="thumb">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="client-content">
                                <img className="temo"  src="assets/images/quote.png" alt=""/>
                                <p className="temo" >“CTO, Lorem ipsum dolor sit amet, consectetur adpiscing elit, sed do eismod tempor idunte ut labore et dolore magna aliqua darwin kengan
                                  lorem ipsum dolor sit amet, consectetur picing elit massive big blasta.”</p>
                              </div>
                              <div className="down-content">
                                <img className="temo"  src="assets/images/client-image.jpg" alt=""/>
                                <div className="right-content">
                                  <h4>Jake H. Nyo</h4>
                                  <span>CTO of Digital Company</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="thumb">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="client-content">
                                <img className="temo"  src="assets/images/quote.png" alt=""/>
                                <p className="temo" >“May, Lorem ipsum dolor sit amet, consectetur adpiscing elit, sed do eismod tempor idunte ut labore et dolore magna aliqua darwin kengan
                                  lorem ipsum dolor sit amet, consectetur picing elit massive big blasta.”</p>
                              </div>
                              <div className="down-content">
                                <img className="temo"  src="assets/images/client-image.jpg" alt=""/>
                                <div className="right-content">
                                  <h4>May C.</h4>
                                  <span>Founder of Catherina Co.</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="thumb">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="client-content">
                                <img className="temo"  src="assets/images/quote.png" alt=""/>
                                <p className="temo" >“Lorem ipsum dolor sit amet, consectetur adpiscing elit, sed do eismod tempor idunte ut labore et dolore magna aliqua darwin kengan
                                  lorem ipsum dolor sit amet, consectetur picing elit massive big blasta.”</p>
                              </div>
                              <div className="down-content">
                                <img className="temo"  src="assets/images/client-image.jpg" alt=""/>
                                <div className="right-content">
                                  <h4>Random Staff</h4>
                                  <span>Manager, Digital Company</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        <div className="thumb">
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="client-content">
                                <img className="temo"  src="assets/images/quote.png" alt=""/>
                                <p className="temo" >“Mark, Lorem ipsum dolor sit amet, consectetur adpiscing elit, sed do eismod tempor idunte ut labore et dolore magna aliqua darwin kengan
                                  lorem ipsum dolor sit amet, consectetur picing elit massive big blasta.”</p>
                              </div>
                              <div className="down-content">
                                <img className="temo"  src="assets/images/client-image.jpg" alt=""/>
                                <div className="right-content">
                                  <h4>Mark Am</h4>
                                  <span>CTO, Amber Do Company</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>          
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  */}

  {/*
  <div id="pricing" className="pricing-tables">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="section-heading">
            <h4>We Have The Best Pre-Order <em>Prices</em> You Can Get</h4>
            <img className="temo"  src="assets/images/heading-line-dec.png" alt=""/>
            <p className="temo" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eismod tempor incididunt ut labore et dolore magna.</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="pricing-item-regular">
            <span className="price">$12</span>
            <h4>Standard Plan App</h4>
            <div className="icon">
              <img className="temo"  src="assets/images/pricing-table-01.png" alt=""/>
            </div>
            <ul>
              <li>Lorem Ipsum Dolores</li>
              <li>20 TB of Storage</li>
              <li className="non-function">Life-time Support</li>
              <li className="non-function">Premium Add-Ons</li>
              <li className="non-function">Fastest Network</li>
              <li className="non-function">More Options</li>
            </ul>
            <div className="border-button">
              <a href="#">Purchase This Plan Now</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="pricing-item-pro">
            <span className="price">$25</span>
            <h4>Business Plan App</h4>
            <div className="icon">
              <img className="temo"  src="assets/images/pricing-table-01.png" alt=""/>
            </div>
            <ul>
              <li>Lorem Ipsum Dolores</li>
              <li>50 TB of Storage</li>
              <li>Life-time Support</li>
              <li>Premium Add-Ons</li>
              <li className="non-function">Fastest Network</li>
              <li className="non-function">More Options</li>
            </ul>
            <div className="border-button">
              <a href="#">Purchase This Plan Now</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="pricing-item-regular">
            <span className="price">$66</span>
            <h4>Premium Plan App</h4>
            <div className="icon">
              <img className="temo"  src="assets/images/pricing-table-01.png" alt=""/>
            </div>
            <ul>
              <li>Lorem Ipsum Dolores</li>
              <li>120 TB of Storage</li>
              <li>Life-time Support</li>
              <li>Premium Add-Ons</li>
              <li>Fastest Network</li>
              <li>More Options</li>
            </ul>
            <div className="border-button">
              <a href="#">Purchase This Plan Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
  */}


  <footer id="about-us">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="section-heading">
            <h4>About us</h4>
          
            <h6 style={{textShadow: "#000 0px 0px 10px", webkitFontSmoothing: "antialiased"}}>Author: Vu Hoang Tuan Anh</h6>
            <h6 style={{textShadow: "#000 0px 0px 10px", webkitFontSmoothing: "antialiased"}}>Matriculation number: 18812</h6>
          </div>
          
        </div>
{/* 
        <div className="col-lg-6 offset-lg-3">
          <form id="search" action="#" method="GET">
            <div className="row">
              <div className="col-lg-6 col-sm-6">
                <fieldset>
                  <input type="address" name="address" className="email" placeholder="Email Address..." autoComplete="on" required/>
                </fieldset>
              </div>
              <div className="col-lg-6 col-sm-6">
                <fieldset>
                  <button type="submit" className="main-button">Subscribe Now <i className="fa fa-angle-right"></i></button>
                </fieldset>
              </div>
            </div>
          </form>
        </div> */}


      </div>
      <div className="row">
        {/* <div className="col-lg-3">
          <div className="footer-widget">
            <h4>Contact Us</h4>
            <p className="temo" >Rio de Janeiro - RJ, 22795-008, Brazil</p>
            <p className="temo" ><a href="#">010-020-0340</a></p>
            <p className="temo" ><a href="#">info@company.co</a></p>
          </div>
        </div> */}

        {/* <div className="col-lg-3">
          <div className="footer-widget">
            <h4>About Us</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Testimonials</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Testimonials</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>
        </div> */}

        {/* <div className="col-lg-3">
          <div className="footer-widget">
            <h4>Useful Links</h4>
            <ul>
              <li><a href="#">Free Apps</a></li>
              <li><a href="#">App Engine</a></li>
              <li><a href="#">Programming</a></li>
              <li><a href="#">Development</a></li>
              <li><a href="#">App News</a></li>
            </ul>
            <ul>
              <li><a href="#">App Dev Team</a></li>
              <li><a href="#">Digital Web</a></li>
              <li><a href="#">Normal Apps</a></li>
            </ul>
          </div>
        </div> */}

        {/* <div className="col-lg-3">
          <div className="footer-widget">
            <h4>About Our Company</h4>
            <div className="logo">
              <img className="temo"  src="assets/images/white-logo.png" alt=""/>
            </div>
            <p className="temo" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
          </div>
        </div> */}
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