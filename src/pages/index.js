import Head from "next/head";
import React, { useEffect, useState } from "react";
import Banner1 from "../components/banner/Banner1";
import Home1Blog from "../components/blog/Home1Blog";
import Preloader from "../components/common/Preloader ";
import Footer from "../components/footer/Footer";
import HowItwork1 from "../components/howItWork/HowItwork1";
import CreativeService from "../components/service/CreativeService";
import HomeService from "../components/service/HomeService";
import OfferService from "../components/service/OfferService";
import PopularService from "../components/service/PopularService";
//import FeaturesShop from "../components/shop/FeaturesShop";
import Testimonial1 from "../components/testimonial/Testimonial1";
import WhyChooseUs from "../components/whyChooseUs/WhyChooseUs";
import Header1 from "./../components/header/Header1";
import axios from "axios";
import Cookies from "universal-cookie";
import { auth } from "../firebase/firebase";
import CryptoJS from "crypto-js";

export default function Home() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  }, []);

  useEffect(() => {
    const cookie = new Cookies();
    if (auth.currentUser) {
      auth.currentUser.getIdToken().then((tkn) => {
        const data = CryptoJS.AES.encrypt(
          JSON.stringify(tkn),
          "getlost"
        ).toString();

        cookie.set("loggedin", data);
      });
    } 
    axios
      .get("http://localhost:5000/checkuser", {
        withCredentials: true,
      }).then(async(res)=>{
            if (res=="login"){
              await auth.signOut().then(() => {
                cookie.set("loggedin", "false");
                window.location = "/";
                window.alert("Last session expired, Logged out!!")
              });
            }
      });
  }, [auth]);

  return (
    <>
      {!loading ? (
        <Preloader />
      ) : (
        <>
          <Head>
<<<<<<< HEAD
            <title>WorkDeal</title>
=======
            <title>WorkDeal - deal is just a step away</title>
>>>>>>> 8ee6afa492653c1dede2fab77f8ac94e2606e08a
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            ></meta>
            <meta name="description" content="Generated by create next app" />
            <link
              rel="icon"
              href="assets/images/fevicon.png"
              type="image/gif"
              sizes="20x20"
            />
          </Head>
          <Header1 />
          <Banner1 />
          <CreativeService />
          <PopularService />
          <HomeService />
          <OfferService />
          <WhyChooseUs />
          <Testimonial1 />
          <Footer />
        </>
      )}
    </>
  );
}
