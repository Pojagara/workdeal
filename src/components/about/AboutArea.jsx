import Link from "next/link";
import React from "react";

function AboutArea() {
  return (
    <section id="down" className="about-us-area sec-m-top">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 wow animate fadeInLeft"
            data-wow-delay="1800ms"
            data-wow-duration="1500ms"
          >
            <div className="about-left">
              <div className="about-title">
                <span>About us</span>
                <h2>
                  Providing Quality Healthcare: Your Trusted Partner in Medical Services
                </h2>
              </div>
              <div>
                <b>Welcome to HealthCarePro!</b>
                <p>
                  Your trusted destination for all your healthcare needs. We are committed to providing compassionate and comprehensive medical services to our patients. Our team of experienced healthcare professionals is dedicated to ensuring your well-being and delivering the highest quality of care.
                </p>
              </div>
              <p>
                At HealthCarePro, we prioritize your health and strive to be your partner in wellness. Explore our range of medical services and let us help you lead a healthier life.
              </p>
              <ul className="feature-list">
                <li>
                  <i className="bi bi-check-all" />
                  Expert Medical Professionals.
                </li>
                <li>
                  <i className="bi bi-check-all" />
                  Comprehensive Healthcare Solutions.
                </li>
              </ul>
              <div className="cmn-btn">
                <Link legacyBehavior href="/appointments">
                  <a>Book an Appointment</a>
                </Link>
              </div>
              <div className="feature-counts">
                <div className="single-count">
                  <span className="counter">50</span>
                  <span>+</span>
                  <h5>Medical Staff</h5>
                </div>
                <div className="single-count">
                  <span className="counter">2000</span>
                  <span>+</span>
                  <h5>Satisfied Patients</h5>
                </div>
                <div className="single-count">
                  <span className="counter">10</span>
                  <span>+</span>
                  <h5>Specialized Services</h5>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-6 wow animate fadeInRight"
            data-wow-delay="1800ms"
            data-wow-duration="1500ms"
          >
            <div className="about-right">
              <div className="shape">
                <img src="assets/images/about/doctor-about-shape.png" alt="" />
              </div>
              <div className="frame-1">
                <div className="img-1">
                  <img src="assets/images/about/doctor-about-banner-1.jpg" alt="" />
                </div>
              </div>
              <div className="frame-2">
                <div className="img-1">
                  <img src="assets/images/about/doctor-about-banner-2.jpg" alt="" />
                </div>
                <div className="img-2">
                  <img src="assets/images/about/doctor-about-banner-3.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}export default AboutArea;
